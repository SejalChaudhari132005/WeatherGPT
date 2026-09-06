from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .routes import auth, profile


app = FastAPI(
    title="WeatherGPT Backend",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(profile.router)


@app.get("/")
def root():

    return {
        "message": "WeatherGPT Backend is running"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }