from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    SUPABASE_URL: str
    SUPABASE_SECRET_KEY: str
    FRONTEND_URL: str = "http://localhost:5173"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()