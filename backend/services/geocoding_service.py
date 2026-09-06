import httpx
from typing import Dict, Any, List
from backend.providers.geocoding.nominatim import NominatimProvider

class GeocodingService:
    def __init__(self):
        self.provider = NominatimProvider()

    async def reverse_geocode(self, latitude: float, longitude: float) -> Dict[str, Any]:
        return await self.provider.reverse_geocode(latitude, longitude)

    async def search_location(self, query: str) -> List[Dict[str, Any]]:
        return await self.provider.search_location(query)

    async def detect_ip_location(self) -> Dict[str, Any]:
        """
        Fallback IP-based location detector when HTML5 Browser Geolocation is unavailable or denied.
        """
        providers = [
            {"url": "https://ipinfo.io/json", "latlon_key": "loc"},
            {"url": "http://ip-api.com/json/", "lat_key": "lat", "lon_key": "lon"},
            {"url": "https://ipapi.co/json/", "lat_key": "latitude", "lon_key": "longitude"}
        ]

        headers = {"User-Agent": "WeatherGPT/1.0"}

        async with httpx.AsyncClient(timeout=6.0, headers=headers) as client:
            for p in providers:
                try:
                    res = await client.get(p["url"])
                    if res.status_code == 200:
                        data = res.json()
                        lat, lon = None, None

                        if "latlon_key" in p and p["latlon_key"] in data:
                            parts = data[p["latlon_key"]].split(",")
                            if len(parts) == 2:
                                lat, lon = float(parts[0]), float(parts[1])
                        elif "lat_key" in p and "lon_key" in p:
                            lat = float(data.get(p["lat_key"]))
                            lon = float(data.get(p["lon_key"]))

                        if lat is not None and lon is not None:
                            # Reverse geocode the IP coordinates for high-precision location details
                            try:
                                geo = await self.provider.reverse_geocode(lat, lon)
                                geo["source"] = "gps"
                                return geo
                            except Exception:
                                city = data.get("city") or "Detected Location"
                                state = data.get("region") or "Maharashtra"
                                country = data.get("country") or "India"
                                return {
                                    "latitude": lat,
                                    "longitude": lon,
                                    "city": city,
                                    "district": city,
                                    "state": state,
                                    "country": country,
                                    "source": "gps"
                                }
                except Exception as e:
                    print(f"[GeocodingService] IP lookup failed for {p['url']}: {e}")
                    continue

        raise Exception("IP-based location detection unavailable")

geocoding_service = GeocodingService()
