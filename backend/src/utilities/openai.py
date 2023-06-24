import os 
import pinecone
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain import OpenAI
from langchain.chat_models import ChatOpenAI


class OpenAi():
    def __init__(self, api_key):
        os.environ["OPENAI_API_KEY"] = api_key
  
    def getEmbeddings(self):
        return OpenAIEmbeddings() 
    
    def getQA(self,docsearch):
        llm = ChatOpenAI(
                temperature=0.1,
                model_name="gpt-3.5-turbo-16k-0613"
            )

        return RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=docsearch.as_retriever(search_kwargs={"k": 10}))
    
