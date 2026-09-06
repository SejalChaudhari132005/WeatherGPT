import httpx
from typing import Dict, Any, List
from .base import BaseGeocodingProvider

class NominatimProvider(BaseGeocodingProvider):
    def __init__(self, user_agent: str = "WeatherGPT/1.0 (contact@weathergpt.local)"):
        self.user_agent = user_agent
        self.headers = {"User-Agent": self.user_agent}

    async def reverse_geocode(self, latitude: float, longitude: float) -> Dict[str, Any]:
        url = "https://nominatim.openstreetmap.org/reverse"
        params = {
            "lat": latitude,
            "lon": longitude,
            "format": "jsonv2",
            "addressdetails": 1,
            "zoom": 14
        }
        
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(url, params=params, headers=self.headers)
            if response.status_code != 200:
                raise Exception(f"Geocoding request failed with status {response.status_code}")
            
            data = response.json()
            address = data.get("address", {})

            # Comprehensive location name extraction (village, hamlet, town, city, suburb, etc.)
            city = (
                address.get("village")
                or address.get("hamlet")
                or address.get("town")
                or address.get("city")
                or address.get("suburb")
                or address.get("neighbourhood")
                or address.get("municipality")
                or address.get("county")
                or address.get("state_district")
                or address.get("state")
                or "Current Location"
            )

            country = address.get("country") or "India"
            state = address.get("state") or address.get("region") or country

            if city == country and state and state != country:
                city = state

            district = (
                address.get("state_district")
                or address.get("county")
                or address.get("district")
                or city
            )

            return {
                "latitude": latitude,
                "longitude": longitude,
                "city": city,
                "district": district,
                "state": state,
                "country": country,
                "display_name": data.get("display_name", f"{city}, {district}, {state}, {country}")
            }

    async def search_location(self, query: str) -> List[Dict[str, Any]]:
        url = "https://nominatim.openstreetmap.org/search"
        # Search query parameters to find cities, villages, towns, talukas across India & worldwide
        params = {
            "q": query,
            "format": "jsonv2",
            "addressdetails": 1,
            "limit": 12,
            "countrycodes": "in"  # Prioritize Indian cities, towns, villages, panchayats, and talukas
        }

        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(url, params=params, headers=self.headers)
            
            # If no Indian results returned, search globally without countrycodes restriction
            results_data = []
            if response.status_code == 200:
                results_data = response.json()
            
            if not results_data:
                fallback_params = {
                    "q": query,
                    "format": "jsonv2",
                    "addressdetails": 1,
                    "limit": 12
                }
                fallback_resp = await client.get(url, params=fallback_params, headers=self.headers)
                if fallback_resp.status_code == 200:
                    results_data = fallback_resp.json()

            results = []
            for item in results_data:
                country = address.get("country") or "India"
                state = address.get("state") or address.get("region") or country

                # Granular location extraction: support villages, hamlets, talukas, towns, cities
                place_name = (
                    address.get("village")
                    or address.get("hamlet")
                    or address.get("town")
                    or address.get("city")
                    or address.get("suburb")
                    or address.get("neighbourhood")
                    or address.get("municipality")
                    or address.get("state_district")
                    or address.get("county")
                    or item.get("name")
                    or "Location"
                )

                if place_name == country and state and state != country:
                    place_name = state

                district = (
                    address.get("state_district")
                    or address.get("county")
                    or address.get("district")
                    or place_name
                )

                try:
                    lat = float(item.get("lat"))
                    lon = float(item.get("lon"))
                except (TypeError, ValueError):
                    continue

                display = f"{place_name}, {district}, {state}".strip(", ")

                results.append({
                    "display_name": item.get("display_name", display),
                    "latitude": lat,
                    "longitude": lon,
                    "city": place_name,
                    "district": district,
                    "state": state,
                    "country": country
                })

            return results
