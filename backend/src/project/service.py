from backend.src.database.Users import Users
from backend.src.database.Projects import projectDBService

def create_new_project(user: Users, name: str, role: str):
    project = projectDBService.create_project(
        user_id=user._id, 
        name=name, 
        role=role
    )
    return project

def get_projects_of_user(user: Users):
    project_list = projectDBService.search_by_user_id(user_id=user._id)
    return project_list