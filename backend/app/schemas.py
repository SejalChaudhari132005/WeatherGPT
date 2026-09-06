from typing import Optional

from pydantic import BaseModel, Field


class LocationUpdate(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)

    city: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None

    location_source: str = "gps"


class ProfileUpdate(BaseModel):
    username: Optional[str] = None
    role: Optional[str] = None
    preferred_language: Optional[str] = None

    latitude: Optional[float] = Field(
        default=None,
        ge=-90,
        le=90
    )

    longitude: Optional[float] = Field(
        default=None,
        ge=-180,
        le=180
    )

    city: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None

    location_source: Optional[str] = None