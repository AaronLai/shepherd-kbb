from pydantic import BaseModel
from fastapi import APIRouter, Depends, File, Form, UploadFile
from typing import Annotated

class RegisterDTO(BaseModel):
    email: str
    password: str

class LoginDTO(BaseModel):
    email: str
    password: str

