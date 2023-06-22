import os 
import pinecone
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain import OpenAI


class OpenAi():
    def __init__(self, api_key):
        os.environ["OPENAI_API_KEY"] = api_key
  
    def getEmbeddings(self):
        return OpenAIEmbeddings() 
    
    def getQA(self,docsearch):
        llm = OpenAI(temperature=0.2)
        return RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=docsearch.as_retriever(search_kwargs={"k": 10}))
    
