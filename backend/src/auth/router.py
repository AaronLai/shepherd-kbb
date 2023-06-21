from fastapi import APIRouter, Depends, File, Form, UploadFile
from typing import Annotated

from backend.config import Settings, get_settings
from backend.src.auth.service import AuthService
from backend.src.auth.model import RegisterDTO

router = APIRouter()

@router.post('/register')
async def register(body: RegisterDTO):
    user = AuthService.register_user(email=body.email, password=body.password)
    return {
        'message': 'User registered successfully'
    }

@router.post('/login')
async def login():
    return None