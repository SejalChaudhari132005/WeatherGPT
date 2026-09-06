import time
from typing import Dict, Any, Optional

class WeatherCacheService:
    def __init__(self, ttl_seconds: int = 300):
        self.ttl_seconds = ttl_seconds
        self._cache: Dict[str, Dict[str, Any]] = {}

    def _make_key(self, latitude: float, longitude: float) -> str:
        return f"{round(latitude, 2)},{round(longitude, 2)}"

    def get(self, latitude: float, longitude: float) -> Optional[Dict[str, Any]]:
        key = self._make_key(latitude, longitude)
        if key in self._cache:
            entry = self._cache[key]
            if time.time() - entry["timestamp"] < self.ttl_seconds:
                return entry["data"]
            else:
                del self._cache[key]
        return None

    def set(self, latitude: float, longitude: float, data: Dict[str, Any]) -> None:
        key = self._make_key(latitude, longitude)
        self._cache[key] = {
            "timestamp": time.time(),
            "data": data,
        }

cache_service = WeatherCacheService(ttl_seconds=300)
