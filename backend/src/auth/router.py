from fastapi import APIRouter, Depends, File, Form, UploadFile
from typing import Annotated

from backend.config import Settings, get_settings
import backend.src.auth.service as AuthService
from backend.src.auth.dependency import verify_jwt_token
from backend.src.auth.model import RegisterDTO, LoginDTO

from backend.src.database.Users import Users

router = APIRouter()

@router.post('/register')
async def register(body: RegisterDTO):
    user = AuthService.register_user(email=body.email, password=body.password)
    return {
        'message': 'User registered successfully'
    }

@router.post('/login')
async def login(body: LoginDTO):
    _, jwt_token = AuthService.user_login(body.email, body.password)
    return {
        'jwt': jwt_token
    }

@router.get('/')
async def get_user_info(user: Annotated[Users, Depends(verify_jwt_token)]):
    return {
        'message': 'Hello {}'.format(user.email)
    }