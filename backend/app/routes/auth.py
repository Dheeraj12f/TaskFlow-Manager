from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.dependencies import get_current_user
from fastapi import Form

from app.database import SessionLocal
from app.models.user import User
from app.schemas.user_schema import UserCreate
from app.utils.hashing import (
    hash_password,
    verify_password
)
from app.utils.jwt_handler import create_access_token

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed_password = hash_password(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()

    return {
        "message": "User Created Successfully"
    }


@router.post("/login")
def login(
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email"
        )

    if not verify_password(password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid Password"
        )

    token = create_access_token(
        data={
            "user_id": user.id,
            "email": user.email,
            "role": user.role
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }



@router.get("/me")
def get_me(current_user = Depends(get_current_user)):

    return {
        "user": current_user
    }