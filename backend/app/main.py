from fastapi import FastAPI
from app.database import Base, engine
from app.routes import auth, projects
from app.models.project import Project
from app.routes import auth
from app.models.user import User
from app.routes import tasks
from app.models.task import Task
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="TaskFlow API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

app.include_router(
    auth.router,
    prefix="/auth",
    tags=["Authentication"]
)
app.include_router(
    projects.router,
    prefix="/projects",
    tags=["Projects"]
)
app.include_router(
    tasks.router,
    prefix="/tasks",
    tags=["Tasks"]
)
@app.get("/")
def home():
    return {
        "message": "TaskFlow API Running"
    }
