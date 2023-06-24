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
from backend.src.database.Users import Users


router = APIRouter()
settings = get_settings()
#load embeddings from openai
embeddings = OpenAi(settings.OPENAI_API_KEY).getEmbeddings();
pinecone.init(
                api_key=settings.PINECONE_API_KEY, 
                environment=settings.PINECONE_ENVIRONMENT 
            )

@router.post('/uploadFile')
async def upload(file: UploadFile = File(...), settings: Settings = Depends(get_settings)):
    try:
        builderService = BuilderService(settings)
        vector = builderService.embedFile(file, pinecone, embeddings, "new")
        return {'status': 'success', 'message': 'File uploaded successfully!'}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post('/passYoutube')
async def passYoutube(data: PassYoutubeDTO, user: Annotated[Users, Depends(verify_jwt_token)], settings: Settings = Depends(get_settings)):
    try:
        builderService = BuilderService(settings)
        vector = builderService.embedYoutube(data.url, pinecone, embeddings, data.projectId)
        return {'status': 'success', 'message': 'YouTube URL processed successfully!'}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post('/readWebpage')
async def readWebpage(data: WebpageDTO, user: Annotated[Users, Depends(verify_jwt_token)], settings: Settings = Depends(get_settings)):
    try:
        builderService = BuilderService(settings)
        vector = builderService.embedWeb(data.url, pinecone, embeddings, data.projectId)
        return {'status': 'success', 'message': 'Webpage read successfully!'}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))