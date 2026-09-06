import httpx
from typing import Dict, Any
from .base import BaseWeatherProvider

class OpenMeteoProvider(BaseWeatherProvider):
    def __init__(self, timeout: float = 10.0):
        self.endpoint = "https://api.open-meteo.com/v1/forecast"
        self.timeout = timeout

    async def fetch_weather(self, latitude: float, longitude: float) -> Dict[str, Any]:
        params = {
            "latitude": latitude,
            "longitude": longitude,
            "current": [
                "temperature_2m",
                "apparent_temperature",
                "relative_humidity_2m",
                "precipitation",
                "rain",
                "showers",
                "weather_code",
                "wind_speed_10m",
                "wind_direction_10m",
                "surface_pressure",
                "visibility",
                "uv_index",
            ],
            "hourly": [
                "temperature_2m",
                "apparent_temperature",
                "precipitation_probability",
                "precipitation",
                "weather_code",
                "wind_speed_10m",
                "wind_direction_10m",
                "uv_index",
                "visibility",
            ],
            "daily": [
                "temperature_2m_max",
                "temperature_2m_min",
                "precipitation_probability_max",
                "precipitation_sum",
                "weather_code",
                "sunrise",
                "sunset",
                "wind_speed_10m_max",
                "uv_index_max",
            ],
            "timezone": "auto",
        }

        async with httpx.AsyncClient(timeout=self.timeout) as client:
            response = await client.get(self.endpoint, params=params)
            if response.status_code != 200:
                raise Exception(f"Open-Meteo API error: status {response.status_code}")
            return response.json()
