from pynamodb.models import Model
from pynamodb.indexes import GlobalSecondaryIndex, AllProjection
from pynamodb.attributes import UnicodeAttribute, UTCDateTimeAttribute

import bcrypt
import uuid
from datetime import datetime, timezone

table_name = 'Users'

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
        host = 'http://localhost:8000'
        region = 'us-east-1'
        projection = AllProjection()
    
    _id = UnicodeAttribute(hash_key=True)
    email = UnicodeAttribute()
    email_index = EmailIndex()
    password = UnicodeAttribute()
    create_at = UTCDateTimeAttribute(default_for_new=get_current_time_utc)

    def is_correct_password(self, expected_password: str) -> bool:
        return bcrypt.checkpw(expected_password.encode('utf-8'), self.password.encode('utf-8'))

class UserDBService():
    def __init__(self):
        if not Users.exists():
            Users.create_table(read_capacity_units=10, write_capacity_units=10, wait=True)
        pass

    def get_by_id(self, _id: str):
        return Users.get(_id)

    def create_user(self, email, password) -> Users:
        new_id = str(uuid.uuid4()).replace('-', '')

        new_user = Users(
            _id=new_id, 
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