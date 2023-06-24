from pydantic import BaseModel
from fastapi import APIRouter, Depends, File, Form, UploadFile
from typing import Annotated



class PassYoutubeDTO(BaseModel):
    url: str | None = None
    projectId: str | None = None



class WebpageDTO(BaseModel):
    url: str | None = None
    projectId: str | None = None
