from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from database import Base

class ScanHistory(Base):
    __tablename__ = "scan_history"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    prediction = Column(String, index=True)
    confidence = Column(Float)
    score = Column(Float)
    feedback_status = Column(String, default="none")  # 'none', 'correct', 'error'
