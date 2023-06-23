from fastapi import APIRouter, Depends, File, Form, UploadFile
from typing import Annotated

from backend.config import Settings, get_settings
from backend.src.auth.dependency import verify_jwt_token
from backend.src.project.model import CreateProjectDTO
import backend.src.project.service as ProjectService

from backend.src.database.Users import Users

router = APIRouter()

@router.get('/')
async def get_projects(user: Annotated[Users, Depends(verify_jwt_token)]):
    project_list = ProjectService.get_projects_of_user(user)
    return {
        'projects': [i.to_dict() for i in project_list]
    }

@router.post('/')
async def new_project(body: CreateProjectDTO, user: Annotated[Users, Depends(verify_jwt_token)]):
    new_project = ProjectService.create_new_project(user, body.name, body.role)
    return {
        'project': new_project.to_dict()
    }
