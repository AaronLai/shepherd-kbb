from fastapi import HTTPException

from backend.src.database.Users import Users
from backend.src.database.Projects import projectDBService
from backend.src.database.Documents import documentsDBService

def create_new_project(user: Users, name: str, role: str, status:str):
    project = projectDBService.create_project(
        user_id=user._id, 
        name=name, 
        role=role,
        status=status
    )
    
    return project

def get_projects_of_user(user: Users):
    project_list = projectDBService.search_by_user_id(user_id=user._id)
    return project_list

def get_project_by_id(project_id: str):
    project = projectDBService.search_project_by_id(id=project_id)
    return project

def get_project_documents(project_id: str):
    project = projectDBService.search_project_by_id(id=project_id)

    if(not project_id):
        raise HTTPException(status_code=404, detail="Project not found")
    
    return documentsDBService.get_all_documents_of_project(project_id=project_id)