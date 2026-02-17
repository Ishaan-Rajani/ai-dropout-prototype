from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from textblob import TextBlob
from pymongo import MongoClient

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ⚠️ Replace with your real MongoDB Atlas connection string
MONGO_URL = "mongodb+srv://aaminpathan751_db_user:hRecEqEnCzQSYx4J@cluster0.pitbojw.mongodb.net/?appName=Cluster0"

client = MongoClient(MONGO_URL)
db = client["dropout_db"]
collection = db["students"]

class StudentData(BaseModel):
    attendance: float
    grades: float
    assignments: float
    mood: str

@app.post("/predict")
def predict(data: StudentData):

    academic_risk = 0

    if data.attendance < 60:
        academic_risk += 30
    if data.grades < 50:
        academic_risk += 30
    if data.assignments < 50:
        academic_risk += 20

    sentiment = TextBlob(data.mood).sentiment.polarity
    mental_risk = 0

    if sentiment < -0.5:
        mental_risk += 40

    crisis_words = ["hopeless", "give up", "suicide", "worthless"]
    if any(word in data.mood.lower() for word in crisis_words):
        mental_risk += 50

    final_risk = min(academic_risk + mental_risk, 100)

    risk_level = "LOW"
    if final_risk > 60:
        risk_level = "HIGH"
    elif final_risk > 30:
        risk_level = "MEDIUM"

    collection.insert_one({
        "attendance": data.attendance,
        "grades": data.grades,
        "assignments": data.assignments,
        "mood": data.mood,
        "risk": final_risk,
        "level": risk_level
    })

    return {
        "risk_percentage": final_risk,
        "risk_level": risk_level
    }
