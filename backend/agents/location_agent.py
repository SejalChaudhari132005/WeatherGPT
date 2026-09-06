from typing import Dict, Any
from backend.services.geocoding_service import geocoding_service

class LocationAgent:
    def __init__(self):
        self.geocoding_service = geocoding_service

    async def resolve_location(self, latitude: float, longitude: float, source: str = "gps") -> Dict[str, Any]:
        """
        Accept coordinates, validate, reverse geocode, normalize address,
        and return structured location context.
        """
        # Coordinate boundary validation
        if not (-90.0 <= latitude <= 90.0):
            raise ValueError(f"Invalid latitude: {latitude}. Must be between -90 and 90.")
        if not (-180.0 <= longitude <= 180.0):
            raise ValueError(f"Invalid longitude: {longitude}. Must be between -180 and 180.")
        
        valid_source = source if source in ["gps", "manual"] else "gps"

        try:
            geo_data = await self.geocoding_service.reverse_geocode(latitude, longitude)
            return {
                "latitude": round(latitude, 4),
                "longitude": round(longitude, 4),
                "city": geo_data.get("city", "Unknown City"),
                "district": geo_data.get("district", "Unknown District"),
                "state": geo_data.get("state", "Unknown State"),
                "country": geo_data.get("country", "India"),
                "source": valid_source
            }
        except Exception as e:
            # Fallback structure if geocoding service is temporarily unreachable
            print(f"[LocationAgent] Geocoding exception: {e}")
            return {
                "latitude": round(latitude, 4),
                "longitude": round(longitude, 4),
                "city": "Unknown City",
                "district": "Unknown District",
                "state": "Unknown State",
                "country": "India",
                "source": valid_source
            }

location_agent = LocationAgent()
