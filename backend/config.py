from functools import lru_cache
from pydantic import BaseSettings

@lru_cache()
def get_settings():
    return Settings()

class Settings(BaseSettings):
    abc = 10
    TESTING_ENVIRONMENT_VAR: str
    OPENAI_API_KEY: str

    class Config:
        env_file = "backend/.env"