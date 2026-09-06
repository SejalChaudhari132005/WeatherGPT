from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status

from ..dependencies import get_current_user
from ..schemas import LocationUpdate, ProfileUpdate
from ..supabase_client import supabase


router = APIRouter(
    prefix="/api/profile",
    tags=["Profile"]
)


@router.get("/")
def get_profile(user=Depends(get_current_user)):

    response = (
        supabase
        .table("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybe_single()
        .execute()
    )

    return {
        "profile": response.data
    }


@router.put("/")
def update_profile(
    profile: ProfileUpdate,
    user=Depends(get_current_user)
):

    update_data = {
        key: value
        for key, value in profile.model_dump(
            exclude_none=True
        ).items()
    }

    update_data["user_id"] = user.id

    response = (
        supabase
        .table("profiles")
        .upsert(
            update_data,
            on_conflict="user_id"
        )
        .select("*")
        .single()
        .execute()
    )

    return {
        "message": "Profile updated successfully",
        "profile": response.data
    }


@router.post("/location")
def update_location(
    location: LocationUpdate,
    user=Depends(get_current_user)
):

    update_data = {
        "user_id": user.id,
        "latitude": location.latitude,
        "longitude": location.longitude,
        "location_source": "gps",
        "updated_at": datetime.now(timezone.utc).isoformat()
    }

    optional_fields = [
        "city",
        "district",
        "state",
        "country"
    ]

    for field in optional_fields:
        value = getattr(location, field)

        if value is not None:
            update_data[field] = value

    try:
        response = (
            supabase
            .table("profiles")
            .upsert(
                update_data,
                on_conflict="user_id"
            )
            .select("*")
            .single()
            .execute()
        )
    except Exception as error:
        print("Supabase profile location update error:", repr(error))
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Unable to save profile location"
        ) from error

    return {
        "message": "GPS location saved",
        "profile": response.data
    }