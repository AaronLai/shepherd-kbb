import os 
import pinecone


class PineconeConnector():
    def __init__(self, api_key: str, environment: str):

        return  pinecone.init(
                api_key=api_key, 
                environment=environment 
            )


