from abc import ABC, abstractmethod
from typing import Dict, Any, List

class BaseGeocodingProvider(ABC):
    @abstractmethod
    async def reverse_geocode(self, latitude: float, longitude: float) -> Dict[str, Any]:
        """Convert latitude and longitude into normalized city, district, state, country metadata."""
        pass

    @abstractmethod
    async def search_location(self, query: str) -> List[Dict[str, Any]]:
        """Search locations matching query string."""
        pass
