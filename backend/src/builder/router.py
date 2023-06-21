from typing import Annotated
from fastapi import APIRouter, Depends, File, Form, UploadFile

from backend.src.builder.service import BuilderService
from backend.src.builder.model import PassYoutubeDTO , WebpageDTO

from backend.config import Settings, get_settings
from langchain.document_loaders import WebBaseLoader, PyPDFLoader
from backend.src.utilities.pinecone import PineconeConnector
from backend.src.utilities.openai import OpenAi
from langchain.embeddings.openai import OpenAIEmbeddings
import os
import pinecone



router = APIRouter()
settings = get_settings()
#load embeddings from openai
embeddings = OpenAi(settings.OPENAI_API_KEY).getEmbeddings();
pinecone.init(
                api_key=settings.PINECONE_API_KEY, 
                environment=settings.PINECONE_ENVIRONMENT 
            )

@router.get('/')
async def greeting(settings: Settings = Depends(get_settings)):

    return {'hi': settings.OPENAI_API_KEY}



@router.post('/uploadFile')
async def upload(file: UploadFile = File(...), settings: Settings = Depends(get_settings)):
    
    builderService = BuilderService(settings)
    vector  = builderService.embedFile( file, pinecone , embeddings ,"new")

    return {
        'type':file.filename,
    }
    
@router.post('/passYoutube')
async def passYoutube(data:PassYoutubeDTO, settings: Settings = Depends(get_settings)):
    
    builderService = BuilderService(settings)
    vector  = builderService.embedYoutube( data.url, pinecone , embeddings ,"new")

    return {
        'type':data.url,
    }
    

@router.post('/readWebpage')
async def readWebpage(data:WebpageDTO, settings: Settings = Depends(get_settings)):
    
    builderService = BuilderService(settings)
    vector  = builderService.embedWeb( data.url, pinecone , embeddings ,"new")

    return {
        'type':data.url,
    }