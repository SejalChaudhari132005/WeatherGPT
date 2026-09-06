from typing import Dict, Any

WMO_CODE_MAP: Dict[int, Dict[str, str]] = {
    0: {"condition": "Clear Sky", "icon": "☀️"},
    1: {"condition": "Mainly Clear", "icon": "🌤️"},
    2: {"condition": "Partly Cloudy", "icon": "⛅"},
    3: {"condition": "Overcast", "icon": "☁️"},
    45: {"condition": "Foggy", "icon": "🌫️"},
    48: {"condition": "Depositing Rime Fog", "icon": "🌫️"},
    51: {"condition": "Light Drizzle", "icon": "🌦️"},
    53: {"condition": "Moderate Drizzle", "icon": "🌧️"},
    55: {"condition": "Dense Drizzle", "icon": "🌧️"},
    56: {"condition": "Light Freezing Drizzle", "icon": "🌧️"},
    57: {"condition": "Dense Freezing Drizzle", "icon": "🌧️"},
    61: {"condition": "Slight Rain", "icon": "🌦️"},
    63: {"condition": "Moderate Rain", "icon": "🌧️"},
    65: {"condition": "Heavy Rain", "icon": "🌧️"},
    66: {"condition": "Light Freezing Rain", "icon": "🌧️"},
    67: {"condition": "Heavy Freezing Rain", "icon": "🌧️"},
    71: {"condition": "Slight Snow Fall", "icon": "🌨️"},
    73: {"condition": "Moderate Snow Fall", "icon": "🌨️"},
    75: {"condition": "Heavy Snow Fall", "icon": "❄️"},
    77: {"condition": "Snow Grains", "icon": "❄️"},
    80: {"condition": "Slight Rain Showers", "icon": "🌦️"},
    81: {"condition": "Moderate Rain Showers", "icon": "🌧️"},
    82: {"condition": "Violent Rain Showers", "icon": "⛈️"},
    85: {"condition": "Slight Snow Showers", "icon": "🌨️"},
    86: {"condition": "Heavy Snow Showers", "icon": "❄️"},
    95: {"condition": "Thunderstorm", "icon": "⛈️"},
    96: {"condition": "Thunderstorm with Slight Hail", "icon": "⛈️"},
    99: {"condition": "Thunderstorm with Heavy Hail", "icon": "⛈️"},
}

def decode_weather_code(code: int) -> Dict[str, str]:
    return WMO_CODE_MAP.get(code, {"condition": "Scattered Showers", "icon": "🌦️"})
