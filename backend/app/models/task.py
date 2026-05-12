from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Date
)

from app.database import Base

class Task(Base):

    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(100))

    description = Column(String(255))

    status = Column(
        String(50),
        default="To Do"
    )

    priority = Column(String(20))

    due_date = Column(Date)

    assigned_to = Column(
        Integer,
        ForeignKey("users.id")
    )

    project_id = Column(
        Integer,
        ForeignKey("projects.id")
    )

    created_by = Column(
        Integer,
        ForeignKey("users.id")
    )