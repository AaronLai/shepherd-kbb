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
from langchain.chains import LLMChain
from langchain.chains.question_answering import load_qa_chain
from langchain.chains.qa_with_sources import load_qa_with_sources_chain
from langchain.chains.conversational_retrieval.prompts import CONDENSE_QUESTION_PROMPT
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

        llm = ChatOpenAI(temperature=0.0, model="gpt-3.5-turbo-16k-0613")
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

    def getConversationalRetrievalChain(self,docsearch):
        
        
            
        # retriever = db.as_retriever(search_type="similarity_score_threshold", search_kwargs={"score_threshold": .5})
        llm = ChatOpenAI(temperature=0.0, model="gpt-3.5-turbo-16k-0613")

        qa = ConversationalRetrievalChain.from_llm(llm, docsearch.as_retriever(search_type="similarity_score_threshold" ,search_kwargs={"k": 3 , "score_threshold":0.7 }), return_source_documents=True , get_chat_history=self.get_chat_history )
        return qa

    def get_chat_history(self,inputs) -> str:
        res = []
        if inputs is None or  len(inputs) <= 2:
            return ""
        
        data = inputs[1:]  # Remove the first dictionary from the list

        pairs = [(data[i], data[i+1]) for i in range(0, len(data), 2)]

        for item1, item2 in pairs:
            result = f"Human: {item1.text}\nAI: {item2.text}"
            res.append(result)
        return "\n".join(res)