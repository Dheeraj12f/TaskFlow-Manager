from pydantic import BaseModel
from datetime import date

class TaskCreate(BaseModel):

    title: str

    description: str

    priority: str

    due_date: date

    assigned_to: int

    project_id: int

class TaskStatusUpdate(BaseModel):

    status: str