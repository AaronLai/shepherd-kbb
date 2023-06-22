import os 
import pinecone
from langchain.vectorstores import Pinecone


class PineconeConnector():
    def getPinecone(self, api_key: str, environment: str):

        return  pinecone.init(
                api_key=api_key, 
                environment=environment 
            )
        
    def getDocSearch(self, api_key: str, environment: str , embeddings , nameSpace: str):
        pinecone.init(
                api_key=api_key, 
                environment=environment 
        )
        return Pinecone.from_existing_index(index_name="kbb", embedding=embeddings , namespace=nameSpace)
       


