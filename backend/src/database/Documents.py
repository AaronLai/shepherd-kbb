from pynamodb.models import Model
from pynamodb.indexes import GlobalSecondaryIndex, AllProjection
from pynamodb.attributes import UnicodeAttribute, UTCDateTimeAttribute,ListAttribute

import bcrypt
import uuid
from datetime import datetime, timezone

from backend.config import get_settings

table_name = '852Shepherd_Documents'
settings = get_settings()

def get_current_time_utc():
    return datetime.now(timezone.utc)

class Documents(Model):
    class Meta:
        table_name = table_name
        region = settings.aws_region
        aws_access_key_id = settings.aws_access_key
        aws_secret_access_key = settings.aws_secret_access_key
        projection = AllProjection()
    
    _id = UnicodeAttribute(range_key=True)
    project_id = UnicodeAttribute(hash_key=True)
    category = UnicodeAttribute()
    topic = ListAttribute()
    file_name = UnicodeAttribute()
    url = UnicodeAttribute(null=True)
    create_at = UTCDateTimeAttribute(default_for_new=get_current_time_utc)

    def to_dict(self) -> dict[str, any]:
        return self.attribute_values

class DocumentsDBService():
    def __init__(self):
        if not Documents.exists():
            Documents.create_table(read_capacity_units=10, write_capacity_units=10, wait=True)
        pass

    def create_new_document(self, project_id: str, category: str, topic: list[str], file_name: str, url: str | None = None):
        new_id = str(uuid.uuid4()).replace('-', '')

        new_document = Documents(
            _id=new_id,
            project_id=project_id,
            category=category,
            topic=topic,
            file_name=file_name,
            url=url
        )
        new_document.save()
        return new_document
    
    def get_all_documents_of_project(self, project_id: str):
        query_result = Documents.query(project_id)
        result = []
        for i in query_result:
            result.append(i)
        return result
    
    def get_document_of_project(self, project_id: str, document_id: str):
        query_result = Documents.query(project_id, Documents._id == document_id)
        result = []
        for i in query_result:
            result.append(i)
        return result
    
    def search_documents_by_topic(self, project_id: str, topic: str):
        query_result = Documents.query(project_id, filter_condition=Documents.topic.contains(topic))
        result = []
        for i in query_result:
            result.append(i)
        return result


documentsDBService = DocumentsDBService()