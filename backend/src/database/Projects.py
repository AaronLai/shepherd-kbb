from pynamodb.models import Model
from pynamodb.indexes import GlobalSecondaryIndex, AllProjection
from pynamodb.attributes import UnicodeAttribute, UTCDateTimeAttribute

import uuid
from datetime import datetime, timezone

from backend.config import get_settings

table_name = '852Shepherd_Projects'
settings = get_settings()

def get_current_time_utc():
    return datetime.now(timezone.utc)

class UserIdIndex(GlobalSecondaryIndex):
    class Meta:
        read_capacity_units = 1
        write_capacity_units = 1
        projection = AllProjection()
    user_id = UnicodeAttribute(hash_key=True)

class Projects(Model):
    class Meta:
        table_name = table_name
        region = settings.aws_region
        aws_access_key_id = settings.aws_access_key
        aws_secret_access_key = settings.aws_secret_access_key
        projection = AllProjection()
    
    _id = UnicodeAttribute(hash_key=True)
    user_id = UnicodeAttribute()
    name = UnicodeAttribute()
    role = UnicodeAttribute()

    user_id_index = UserIdIndex()

    def to_dict(self) -> dict[str, any]:
        return self.attribute_values

class ProjectDBService():
    def __init__(self):
        if not Projects.exists():
            Projects.create_table(read_capacity_units=10, write_capacity_units=10, wait=True)
        pass

    def search_project_by_id(self, id: str):
        result = Projects.get(id)
        return result

    def create_project(self, user_id, name, role):
        new_id = str(uuid.uuid4()).replace('-', '')
        new_project = Projects(
            _id=new_id, 
            user_id=user_id, 
            name=name, 
            role=role
        )
        new_project.save()

        return new_project
    
    def search_by_user_id(self, user_id) -> list[Projects]:
        query_result = Projects.user_id_index.query(user_id)
        result = []
        for i in query_result:
            result.append(i)
        return result

projectDBService = ProjectDBService()