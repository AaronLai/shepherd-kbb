from fastapi import UploadFile

from langchain.chains import ConversationChain
from backend.src.utilities.pinecone import PineconeConnector
from langchain.document_loaders import PyPDFLoader
from langchain.document_loaders import Docx2txtLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Pinecone
from langchain.document_loaders import YoutubeLoader
from langchain.document_loaders import WebBaseLoader
from backend.src.loader.webPageLoader import WebPageLoader
from backend.src.utilities.openai import OpenAi

import tempfile
import shutil
import os

from backend.config import Settings

class ChattingService():
    def __init__(self, settings: Settings):
        self.settings = settings

    def chat_with_namespace(self, settings: Settings, embedding,  namespace , text):
        
        docSearch = PineconeConnector().getDocSearch(settings.PINECONE_API_KEY , settings.PINECONE_ENVIRONMENT ,embedding, namespace)
        qa = OpenAi(settings.OPENAI_API_KEY).getQA(docSearch)
        
        result = qa({"query": text}, return_only_outputs=True)
        docsList =[]
        for doc in result["source_documents"]:
            docsList.append(doc.metadata["source"])
        print(docsList)

        answer = {
            "text":result["result"],
            "source":docsList
        }
        
        return answer
    
