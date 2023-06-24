from typing import Annotated
from fastapi import APIRouter, Depends, File, Form, UploadFile, HTTPException

from backend.src.builder.service import BuilderService
from backend.src.builder.model import PassYoutubeDTO , WebpageDTO

from backend.config import Settings, get_settings
from langchain.document_loaders import WebBaseLoader, PyPDFLoader
from backend.src.utilities.pinecone import PineconeConnector
from backend.src.utilities.openai import OpenAi
from langchain.embeddings.openai import OpenAIEmbeddings
import pinecone

from backend.src.auth.dependency import verify_jwt_token
import backend.src.auth.service as AuthService
from backend.src.database.Users import Users
from backend.src.database.Documents import documentsDBService
from backend.src.database.Projects import projectDBService


router = APIRouter()
settings = get_settings()
#load embeddings from openai
embeddings = OpenAi(settings.OPENAI_API_KEY).getEmbeddings();
pinecone.init(
                api_key=settings.PINECONE_API_KEY, 
                environment=settings.PINECONE_ENVIRONMENT 
            )

@router.post('/uploadFile')
async def upload(file: UploadFile = File(...), project_id: str = Form(...), user: Users = Depends(verify_jwt_token), settings: Settings = Depends(get_settings)):
    AuthService.is_project_owner(user._id, project_id)

    try:
        builderService = BuilderService(settings)
        vector = builderService.embedFile(file, pinecone, embeddings, project_id)

        documentsDBService.create_new_document(
            project_id=project_id, 
            category='file', 
            topic=[], 
            file_name=file.filename
        )
        projectDBService.increase_document_count(project_id, 1)

        return {'status': 'success', 'message': 'File uploaded successfully!'}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post('/passYoutube')
async def passYoutube(data: PassYoutubeDTO, user: Annotated[Users, Depends(verify_jwt_token)], settings: Settings = Depends(get_settings)):
    AuthService.is_project_owner(user._id, data.projectId)

    try:
        builderService = BuilderService(settings)
        vector = builderService.embedYoutube(data.url, pinecone, embeddings, data.projectId)

        documentsDBService.create_new_document(
            project_id=data.projectId, 
            category='youtube', 
            topic=[], 
            file_name=data.url
        )
        projectDBService.increase_document_count(data.projectId, 1)

        return {'status': 'success', 'message': 'YouTube URL processed successfully!'}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post('/readWebpage')
async def readWebpage(data: WebpageDTO, user: Annotated[Users, Depends(verify_jwt_token)], settings: Settings = Depends(get_settings)):
    AuthService.is_project_owner(user._id, data.projectId)
    
    try:
        builderService = BuilderService(settings)
        vector = builderService.embedWeb(data.url, pinecone, embeddings, data.projectId)

        documentsDBService.create_new_document(
            project_id=data.projectId, 
            category='website', 
            topic=[], 
            file_name=data.url
        )
        projectDBService.increase_document_count(data.projectId, 1)

        return {'status': 'success', 'message': 'Webpage read successfully!'}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))