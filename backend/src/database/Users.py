from pynamodb.models import Model
from pynamodb.indexes import GlobalSecondaryIndex, AllProjection
from pynamodb.attributes import UnicodeAttribute, UTCDateTimeAttribute

import bcrypt
import uuid
from datetime import datetime, timezone

from backend.config import get_settings

table_name = '852Shepherd_Users'
settings = get_settings()

def get_current_time_utc():
    return datetime.now(timezone.utc)

class EmailIndex(GlobalSecondaryIndex):
    class Meta:
        read_capacity_units = 1
        write_capacity_units = 1
        projection = AllProjection()
    email = UnicodeAttribute(hash_key=True)

class Users(Model):
    class Meta:
        table_name = table_name
        region = settings.aws_region
        aws_access_key_id = settings.aws_access_key
        aws_secret_access_key = settings.aws_secret_access_key
        projection = AllProjection()
    
    _id = UnicodeAttribute(hash_key=True)
    name = UnicodeAttribute()
    email = UnicodeAttribute()
    password = UnicodeAttribute()
    create_at = UTCDateTimeAttribute(default_for_new=get_current_time_utc)
    
    email_index = EmailIndex()

    def is_correct_password(self, expected_password: str) -> bool:
        return bcrypt.checkpw(expected_password.encode('utf-8'), self.password.encode('utf-8'))

class UserDBService():
    def __init__(self):
        if not Users.exists():
            Users.create_table(read_capacity_units=10, write_capacity_units=10, wait=True)
        pass

    def get_by_id(self, _id: str):
        return Users.get(_id)

    def create_user(self, name, email, password) -> Users:
        new_id = str(uuid.uuid4()).replace('-', '')

        new_user = Users(
            _id=new_id, 
            name=name,
            email=email, 
            password=password, 
        )
        new_user.save()

        return new_user

    def search_by_email(self, email: str) -> list[Users]:
        query_result = Users.email_index.query(email)
        result = []
        for i in query_result:
            result.append(i)
        return result

userDBService = UserDBService()