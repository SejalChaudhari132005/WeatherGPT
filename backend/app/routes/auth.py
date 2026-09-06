from fastapi import APIRouter, Depends

from ..dependencies import get_current_user


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


@router.get("/me")
def get_me(user=Depends(get_current_user)):

    return {
        "id": user.id,
        "phone": user.phone,
        "email": user.email,
        "user_metadata": user.user_metadata
    }