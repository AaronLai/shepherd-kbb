from pydantic import BaseModel
from fastapi import APIRouter, Depends, File, Form, UploadFile
from typing import Annotated

class Chat(BaseModel):
    text: str | None = None
    sender: str | None = None



class ChattingDTO(BaseModel):
    projectId: str | None = None
    userId: str | None = None
    nameSpace: str | None = None
    text: str | None = None
    history: list[Chat] | None = None



