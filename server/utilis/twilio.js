import dotenv from 'dotenv'
import twilio from "twilio"
const TWILIO_ACCOUNT_SID = "AC69a64405d719c0f0ee823f94e77f5e6a"
const TWILIO_AUTH_TOKEN = "fa33fdbae95385b84a6555a94fe05830"
const TWILIO_PHONE_NUMBER = +19787763106

export const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)