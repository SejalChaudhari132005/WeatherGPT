from typing import Dict, Any
from backend.agents.location_agent import location_agent
from backend.agents.weather_agent import weather_agent

class CitizenWeatherService:
    def __init__(self):
        self.location_agent = location_agent
        self.weather_agent = weather_agent

    async def get_citizen_weather(self, latitude: float, longitude: float, source: str = "gps") -> Dict[str, Any]:
        """
        Coordinates Location Agent resolution and Weather Agent normalized retrieval for the Citizen role.
        """
        # Resolve location metadata
        loc_meta = await self.location_agent.resolve_location(latitude, longitude, source=source)
        
        # Retrieve normalized weather data
        weather_payload = await self.weather_agent.get_weather(latitude, longitude, location_meta=loc_meta)
        
        return weather_payload

citizen_weather_service = CitizenWeatherService()
