from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100))

    description = Column(String(255))

    created_by = Column(
        Integer,
        ForeignKey("users.id")
    )