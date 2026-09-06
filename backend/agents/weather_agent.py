from datetime import datetime, timezone
from typing import Dict, Any, List
from backend.providers.weather.base import BaseWeatherProvider
from backend.providers.weather.open_meteo import OpenMeteoProvider
from backend.services.weather_code_service import decode_weather_code
from backend.services.cache_service import cache_service

class WeatherAgent:
    def __init__(self, provider: BaseWeatherProvider = None):
        self.provider = provider or OpenMeteoProvider()

    async def get_weather(self, latitude: float, longitude: float, location_meta: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Retrieves, normalizes, and caches real weather data for given coordinates.
        """
        # Coordinate validation
        if not (-90.0 <= latitude <= 90.0):
            raise ValueError(f"Invalid latitude: {latitude}")
        if not (-180.0 <= longitude <= 180.0):
            raise ValueError(f"Invalid longitude: {longitude}")

        # Check Cache
        cached_data = cache_service.get(latitude, longitude)
        if cached_data:
            if location_meta:
                cached_data["location"] = location_meta
            cached_data["source"]["is_cached"] = True
            return cached_data

        # Fetch Raw Data from Provider
        raw = await self.provider.fetch_weather(latitude, longitude)
        now_iso = datetime.now(timezone.utc).isoformat()

        # Parse Current Weather
        current_raw = raw.get("current", {})
        weather_code = current_raw.get("weather_code", 0)
        decoded_condition = decode_weather_code(weather_code)

        # Wind cardinal direction helper
        def get_wind_direction_label(deg: float) -> str:
            if deg is None: return "N"
            val = int((deg / 22.5) + .5)
            arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
            return arr[(val % 16)]

        wind_deg = current_raw.get("wind_direction_10m")
        wind_dir = get_wind_direction_label(wind_deg) if wind_deg is not None else "SW"

        # Visibility conversion (m to km)
        raw_vis_m = current_raw.get("visibility")
        vis_km = round(raw_vis_m / 1000.0, 1) if raw_vis_m is not None else None

        current_norm = {
            "temperature": round(current_raw.get("temperature_2m")) if current_raw.get("temperature_2m") is not None else None,
            "feels_like": round(current_raw.get("apparent_temperature")) if current_raw.get("apparent_temperature") is not None else None,
            "humidity": round(current_raw.get("relative_humidity_2m")) if current_raw.get("relative_humidity_2m") is not None else None,
            "rain_probability": None, # Filled from hourly[0] if available
            "precipitation": current_raw.get("precipitation"),
            "wind_speed": round(current_raw.get("wind_speed_10m")) if current_raw.get("wind_speed_10m") is not None else None,
            "wind_direction": wind_dir,
            "visibility": vis_km,
            "pressure": round(current_raw.get("surface_pressure")) if current_raw.get("surface_pressure") is not None else None,
            "uv_index": round(current_raw.get("uv_index"), 1) if current_raw.get("uv_index") is not None else None,
            "condition": decoded_condition["condition"],
            "icon": decoded_condition["icon"],
            "weather_code": weather_code,
            "observed_at": now_iso
        }

        # Parse Hourly Forecast (Next 24 Hours)
        hourly_raw = raw.get("hourly", {})
        times = hourly_raw.get("time", [])
        temps = hourly_raw.get("temperature_2m", [])
        rain_probs = hourly_raw.get("precipitation_probability", [])
        codes = hourly_raw.get("weather_code", [])

        hourly_norm: List[Dict[str, Any]] = []
        for i in range(min(24, len(times))):
            t_str = times[i]
            # Format time display
            try:
                dt = datetime.fromisoformat(t_str)
                time_label = "NOW" if i == 0 else dt.strftime("%I %p").lstrip("0")
            except Exception:
                time_label = t_str

            code = codes[i] if i < len(codes) else 0
            cond = decode_weather_code(code)
            prob = rain_probs[i] if i < len(rain_probs) else 0
            temp = round(temps[i]) if i < len(temps) and temps[i] is not None else 25

            if i == 0:
                current_norm["rain_probability"] = prob or 0

            hourly_norm.append({
                "time": time_label,
                "iso_time": t_str,
                "temp": temp,
                "condition": cond["condition"],
                "icon": cond["icon"],
                "rainProb": prob,
                "highlight": prob >= 60
            })

        # Parse Daily Forecast (7 Days)
        daily_raw = raw.get("daily", {})
        d_times = daily_raw.get("time", [])
        d_maxs = daily_raw.get("temperature_2m_max", [])
        d_mins = daily_raw.get("temperature_2m_min", [])
        d_probs = daily_raw.get("precipitation_probability_max", [])
        d_codes = daily_raw.get("weather_code", [])

        daily_norm: List[Dict[str, Any]] = []
        for i in range(min(7, len(d_times))):
            d_str = d_times[i]
            try:
                dt = datetime.fromisoformat(d_str)
                day_label = "Today" if i == 0 else dt.strftime("%a")
                date_label = dt.strftime("%b %d")
            except Exception:
                day_label = f"Day {i+1}"
                date_label = d_str

            code = d_codes[i] if i < len(d_codes) else 0
            cond = decode_weather_code(code)
            high = round(d_maxs[i]) if i < len(d_maxs) and d_maxs[i] is not None else 30
            low = round(d_mins[i]) if i < len(d_mins) and d_mins[i] is not None else 22
            prob = d_probs[i] if i < len(d_probs) and d_probs[i] is not None else 0

            daily_norm.append({
                "day": day_label,
                "date": date_label,
                "high": high,
                "low": low,
                "condition": cond["condition"],
                "icon": cond["icon"],
                "rainProbability": prob,
                "humidity": current_norm["humidity"] or 70
            })

        normalized_result = {
            "location": location_meta or {
                "latitude": latitude,
                "longitude": longitude,
                "city": "Detected Location",
                "district": "",
                "state": "",
                "country": "India"
            },
            "current": current_norm,
            "hourly": hourly_norm,
            "daily": daily_norm,
            "source": {
                "provider": "Open-Meteo",
                "retrieved_at": now_iso,
                "is_cached": False
            }
        }

        # Save into in-memory cache
        cache_service.set(latitude, longitude, normalized_result)
        return normalized_result

weather_agent = WeatherAgent()
