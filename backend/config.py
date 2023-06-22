from functools import lru_cache
from pydantic import BaseSettings, Field

@lru_cache()
def get_settings():
    return Settings()

class Settings(BaseSettings):
    abc = 10
    TESTING_ENVIRONMENT_VAR: str
    OPENAI_API_KEY: str
    jwt_secret: str = Field(..., env="JWT_SECRET")
    aws_region: str = Field(..., env="AWS_REGION")
    aws_access_key: str = Field(..., env="AWS_ACCESS_KEY")
    aws_secret_access_key: str = Field(..., env="AWS_SECRET_ACCESS_KEY")


    class Config:
        env_file = "backend/.env"