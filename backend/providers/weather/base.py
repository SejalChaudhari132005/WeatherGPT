from abc import ABC, abstractmethod
from typing import Dict, Any

class BaseWeatherProvider(ABC):
    @abstractmethod
    async def fetch_weather(self, latitude: float, longitude: float) -> Dict[str, Any]:
        """Fetch raw current, hourly, and daily weather data from the provider."""
        pass
