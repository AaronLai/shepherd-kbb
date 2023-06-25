import os 
import pinecone
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.chains.combine_documents.stuff import StuffDocumentsChain
from langchain.prompts import PromptTemplate
from langchain.chains import create_qa_with_sources_chain
from langchain.chains import ConversationalRetrievalChain

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

        return  RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=docsearch.as_retriever(search_kwargs={"k": 5}), return_source_documents=True)

    def getRetrivelQA(self,docsearch):

        llm = ChatOpenAI(temperature=0.0, model="gpt-3.5-turbo-0613")
        qa_chain = create_qa_with_sources_chain(llm)

        doc_prompt = PromptTemplate(
            template="Content: {page_content}\nSource: {source}",
            input_variables=["page_content", "source"],
        )
        final_qa_chain = StuffDocumentsChain(
            llm_chain=qa_chain, 
            document_variable_name='context',
            document_prompt=doc_prompt,
        )
        return RetrievalQA(
            retriever=docsearch.as_retriever(),
            combine_documents_chain=final_qa_chain
        )



        # return  RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=docsearch.as_retriever(search_kwargs={"k": 5}), return_source_documents=True)
