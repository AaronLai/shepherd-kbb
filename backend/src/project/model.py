from pydantic import BaseModel

class CreateProjectDTO(BaseModel):
    name: str
    role: str
