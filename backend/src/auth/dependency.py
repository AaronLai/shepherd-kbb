from typing import Annotated
from fastapi import Depends, FastAPI, Header, HTTPException, status
from jose import JWTError, jwt

from backend.src.database.Users import userDBService
import backend.src.auth.service as AuthService

def verify_jwt_token(token: Annotated[str, Header()]):
    return AuthService.get_user_from_jwt(token)