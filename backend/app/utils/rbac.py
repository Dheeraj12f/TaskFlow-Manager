from fastapi import HTTPException

def admin_only(current_user):

    if current_user["role"] != "admin":

        raise HTTPException(
            status_code=403,
            detail="Admin Access Required"
        )