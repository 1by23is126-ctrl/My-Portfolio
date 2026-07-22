from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import requests
import os
import logging
import re
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
from email.message import EmailMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class ContactSubmission(BaseModel):
    name: str
    email: str
    message: str


class ContactResponse(BaseModel):
    success: bool = True
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


def build_whatsapp_message(contact: ContactSubmission) -> str:
    return (
        "🚀 New Portfolio Inquiry\n\n"
        f"👤 Name: {contact.name}\n\n"
        f"📧 Email: {contact.email}\n\n"
        f"💬 Message:\n{contact.message.strip()}\n\n"
        "🌐 Sent from Portfolio Website"
    )


def send_contact_email(contact: ContactSubmission) -> None:
    smtp_host = os.environ.get("SMTP_HOST")
    smtp_port = os.environ.get("SMTP_PORT")
    smtp_username = os.environ.get("SMTP_USERNAME")
    smtp_password = os.environ.get("SMTP_PASSWORD")
    email_to = os.environ.get("CONTACT_EMAIL_TO")
    email_from = os.environ.get("CONTACT_EMAIL_FROM", smtp_username)

    if not all([smtp_host, smtp_port, smtp_username, smtp_password, email_to, email_from]):
        logger.info("Contact email dispatch is not configured; skipping email send for %s", contact.email)
        return

    message = EmailMessage()
    message["Subject"] = f"New portfolio inquiry from {contact.name}"
    message["From"] = email_from
    message["To"] = email_to
    message.set_content(
        f"Name: {contact.name}\n"
        f"Email: {contact.email}\n\n"
        f"Message:\n{contact.message.strip()}\n"
    )

    import smtplib

    with smtplib.SMTP(smtp_host, int(smtp_port), timeout=10) as smtp:
        smtp.starttls()
        smtp.login(smtp_username, smtp_password)
        smtp.send_message(message)


def send_whatsapp_message(contact: ContactSubmission) -> None:
    access_token = os.environ["WHATSAPP_ACCESS_TOKEN"]
    phone_number_id = os.environ["WHATSAPP_PHONE_NUMBER_ID"]
    to_number = re.sub(r"\D", "", os.environ["WHATSAPP_TO_NUMBER"])

    if not to_number:
        raise RuntimeError("WHATSAPP_TO_NUMBER did not contain any digits")

    url = f"https://graph.facebook.com/v23.0/{phone_number_id}/messages"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": to_number,
        "type": "text",
        "text": {
            "preview_url": False,
            "body": build_whatsapp_message(contact),
        },
    }

    response = requests.post(url, json=payload, headers=headers, timeout=10)
    response.raise_for_status()


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_message(contact: ContactSubmission):
    try:
        send_contact_email(contact)
    except Exception as exc:
        logger.exception("Failed to send contact email")
        raise HTTPException(status_code=500, detail="Failed to send contact email") from exc

    try:
        send_whatsapp_message(contact)
    except Exception:
        logger.exception("WhatsApp Cloud API delivery failed")

    return ContactResponse(message="Contact submission received")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()