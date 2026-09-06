import uvicorn
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

from backend.agents.location_agent import location_agent
from backend.services.geocoding_service import geocoding_service
from backend.services.citizen_weather_service import citizen_weather_service

app = FastAPI(
    title="WeatherGPT API",
    description="Agentic Weather Decision-Support System Backend",
    version="1.0.0"
)

# CORS middleware for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LocationResolveRequest(BaseModel):
    latitude: float = Field(..., ge=-90.0, le=90.0)
    longitude: float = Field(..., ge=-180.0, le=180.0)
    source: Optional[str] = "gps"

@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "service": "WeatherGPT Orchestrator API",
        "message": "FastAPI backend connected successfully"
    }

@app.post("/api/location/resolve")
async def resolve_location(req: LocationResolveRequest):
    try:
        location_data = await location_agent.resolve_location(
            latitude=req.latitude,
            longitude=req.longitude,
            source=req.source or "gps"
        )
        return {
            "success": True,
            "location": location_data
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/location/search")
async def search_location(q: str = Query(..., min_length=1)):
    try:
        results = await geocoding_service.search_location(q)
        return {
            "success": True,
            "results": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Location search failed: {str(e)}")

@app.post("/api/location/detect_ip")
async def detect_ip_location():
    try:
        ip_location = await geocoding_service.detect_ip_location()
        return {
            "success": True,
            "location": ip_location
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"IP location detection failed: {str(e)}")

@app.get("/api/weather")
async def get_weather(
    latitude: float = Query(..., ge=-90.0, le=90.0),
    longitude: float = Query(..., ge=-180.0, le=180.0),
    source: Optional[str] = Query("gps")
):
    try:
        data = await citizen_weather_service.get_citizen_weather(latitude, longitude, source=source)
        return {
            "success": True,
            "data": data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Weather retrieval failed: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
