from pydantic import BaseModel
from fastapi import APIRouter, Depends, File, Form, UploadFile
from typing import Annotated

class LangchainRunDTO(BaseModel):
    prompt: str
