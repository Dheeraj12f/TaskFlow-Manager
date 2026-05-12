from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.utils.rbac import admin_only
from app.database import SessionLocal
from app.models.task import Task
from app.schemas.task_schema import TaskCreate
from app.utils.dependencies import get_current_user
from app.schemas.task_schema import (
    TaskCreate,
    TaskStatusUpdate
)
router = APIRouter()

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

@router.post("/create")
def create_task(
    task: TaskCreate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    admin_only(current_user)
    new_task = Task(
        title=task.title,
        description=task.description,
        priority=task.priority,
        due_date=task.due_date,
        assigned_to=task.assigned_to,
        project_id=task.project_id,
        created_by=current_user["user_id"]
    )

    db.add(new_task)

    db.commit()

    return {
        "message": "Task Created Successfully"
    }
@router.get("/")
def get_tasks(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    tasks = db.query(Task).all()

    return tasks
@router.put("/{task_id}/status")
def update_task_status(
    task_id: int,
    task_update: TaskStatusUpdate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if not task:
        return {
            "message": "Task Not Found"
        }

    task.status = task_update.status

    db.commit()

    return {
        "message": "Task Status Updated"
    }