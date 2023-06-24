from typing import Annotated, Optional
from fastapi import Depends, FastAPI, Header, HTTPException, status
from jose import JWTError, jwt

from backend.src.database.Users import userDBService
import backend.src.auth.service as AuthService

def verify_jwt_token(token: Annotated[str, Header()]):
    return AuthService.get_user_from_jwt(token)

def verify_jwt_token_optional(token: Optional[str] = Header(None)):
    if(token is None):
        return None
    
    return AuthService.get_user_from_jwt(token)