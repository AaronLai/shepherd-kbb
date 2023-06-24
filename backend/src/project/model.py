from pydantic import BaseModel
from typing import Literal

class CreateProjectDTO(BaseModel):
    name: str
    role: str
    status: Literal['public', 'private']
