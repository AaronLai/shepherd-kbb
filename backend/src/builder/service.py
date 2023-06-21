from fastapi import UploadFile

from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from backend.src.utilities.pinecone import PineconeConnector
from langchain.document_loaders import PyPDFLoader
from langchain.document_loaders import Docx2txtLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Pinecone
from langchain.document_loaders import YoutubeLoader
from langchain.document_loaders import WebBaseLoader
from backend.src.loader.webPageLoader import WebPageLoader



import tempfile
import shutil
import os

from backend.config import Settings

class BuilderService():
    def __init__(self, settings: Settings):
        self.settings = settings


    def getPinecone(settings: Settings):
        return PineconeConnector(settings.PINECONE_API_KEY, settings.PINECONE_ENVIRONMENT)
    
    def embedFile(self, file: UploadFile , pinecone  , embeddings , namespace):
        data = self.fileProcessing(file)
        vector = self.saveToPinecone("kbb", data, pinecone,embeddings,namespace)
        return vector
    
    def embedYoutube(self, url , pinecone  , embeddings , namespace):
        data = self.youtubeProcessing(url)
        vector = self.saveToPinecone("kbb", data, pinecone,embeddings,namespace)
        return vector
    
    def embedWeb(self, url , pinecone  , embeddings , namespace):
        data = self.webpageProcessing(url)
        vector = self.saveToPinecone("kbb", data, pinecone,embeddings,namespace)
        return vector
    
    def youtubeProcessing(self, url):
        try:
            loader =YoutubeLoader.from_youtube_url(
                        url, add_video_info=True
                    )
            data = loader.load()
            return data
        except Exception as e:
            return {'type': 'error', 'message': str(e)}
        
    def webpageProcessing(self, url):
        try:
            loader = WebPageLoader(url)

            data = loader.load()
            return data
        except Exception as e:
            return {'type': 'error', 'message': str(e)}
    
    
    def fileProcessing(self, file: UploadFile):
        extension = file.filename.split(".")[-1].lower()
        if extension in ["pdf", "docx", "txt"]:
            try:
                with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                    shutil.copyfileobj(file.file, temp_file)
                    if extension == "pdf":
                        loader = PyPDFLoader(temp_file.name)
                        data = loader.load_and_split()
                    elif extension == "docx":
                    # Handle DOCX file processing
                        loader = Docx2txtLoader(temp_file.name)

                        data = loader.load()

                    elif extension == "txt":
                    # Handle TXT file processing
                        data=""
                        
                    temp_file_path = temp_file.name
                
                return data
            except Exception as e:
                return {'type': 'error', 'message': str(e)}
            finally:
                if temp_file_path:
                    os.remove(temp_file_path)  # Delete the temporary file
    
    def saveToPinecone(self, index_name , data, pinecone, embeddings , namespace):
        
        # split the pages into chunks of 1000 characters
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size = 1000,
            chunk_overlap  = 200,
            length_function = len,
        )

        docs = text_splitter.split_documents(data)
        
        # check if index already exists (it shouldn't if this is first time)
        if index_name not in pinecone.list_indexes():
            # if does not exist, create index
            pinecone.create_index(
                index_name,
                dimension=1536,
                metric='cosine',
                metadata_config={'indexed': ['channel_id', 'published']}
            )
            docsearch = Pinecone.from_documents(docs, embeddings, index_name=index_name , namespace=namespace)
        else:
            # if exists, add texts
            print("index exists")
            docsearch = Pinecone.from_existing_index(index_name=index_name, embedding=embeddings ,  namespace=namespace).add_documents(docs)
    
        # for i in range(len(data)):
        #     if data[i] != "":
        #         pinecone.upsert_embeddings("conversation", embeddings.embed(data[i]), data[i])
        return docsearch