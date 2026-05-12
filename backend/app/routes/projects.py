from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.project import Project
from app.schemas.project_schema import ProjectCreate
from app.utils.dependencies import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create")
def create_project(
    project: ProjectCreate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    new_project = Project(
        name=project.name,
        description=project.description,
        created_by=current_user["user_id"]
    )

    db.add(new_project)

    db.commit()

    return {
        "message": "Project Created Successfully"
    }
@router.get("/")
def get_projects(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    projects = db.query(Project).all()

    return projects