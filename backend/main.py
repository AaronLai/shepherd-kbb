from fastapi import FastAPI, Depends
from backend.config import Settings, get_settings

from backend.src.langchain.router import router as langchain_router
from backend.src.auth.router import router as auth_router
from backend.src.builder.router import router as builder_router
from backend.src.chatting.router import router as chatting_router

app = FastAPI()

@app.get("/healthcheck")
def health_check(settings: Settings = Depends(get_settings)) -> dict[str, str]:
    print(settings)
    return {
        "message": "Hello World!",
        "TESTING_ENVIRONMENT_VAR": settings.TESTING_ENVIRONMENT_VAR
    }

app.include_router(langchain_router, prefix="/langchain")
app.include_router(auth_router, prefix="/auth")
app.include_router(builder_router, prefix="/builder")
app.include_router(chatting_router, prefix="/chatting")
