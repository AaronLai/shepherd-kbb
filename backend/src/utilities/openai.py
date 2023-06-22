import os 
import pinecone
from langchain.embeddings.openai import OpenAIEmbeddings


class OpenAi():
    def __init__(self, api_key):
        os.environ["OPENAI_API_KEY"] = api_key
  
    def getEmbeddings(self):
        return OpenAIEmbeddings() 


