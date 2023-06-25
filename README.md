# 852Shepherd

"KnowledgeBot Builder" - Empowering You to Create Intelligent AI-Assistants without Code!

KnowledgeBot Builder is a revolutionary no-code tool designed to simplify the process of building a comprehensive knowledge AI-assistant. With just a few clicks, users can effortlessly upload files, URLs of webpages, or even YouTube videos to create their very own personalized knowledge database.

Engage in seamless conversations with your AI-assistant, as it leverages your uploaded content to provide accurate and insightful responses. Whether you're an individual seeking a personal tutor or an enterprise in need of an internal knowledge management system, KnowledgeBot Builder is the ultimate solution.

In addition, KnowledgeBot Builder will offer a variety of templates tailored for different roles, including teachers, assistants, and company coaches. These templates will provide pre-designed prompts and conversation flows specifically designed to enhance the interaction and effectiveness of each role.

At KnowledgeBot Builder, we understand the user's needs for a seamless experience. Simply upload your documents or provide URLs, and leave the rest to us. We will handle software engineering and prompt engineering.

---

## Tech stack

**Frontend**: Next.js, React.js, Typescript, chakra-ui, chatscope

**Backend**: Python with FastAPI, Langchain, pynamodb

**Database**: Pinecorn, DynamoDB

**Cloud**: Vercel, AWS

**Misc**: OpenAI Service

## Setup

**Frontend**

1. Rename `.env.sample` to `.env` and fill in with your environment
2. Run `npm install`
3. Run `npm run dev` to start

**Backend**

1. Register the service of OpenAI, Pinecorn and AWS
2. Rename `.env.sample` to `.env` and fill in with your environment
3. Run `pip install -r backend/requirements.txt`
4. Run `uvicorn backend.main:app` to start

---

## How to use

1. Create and login to your account by using email and password
2. Create a new project
3. Upload some documents(websites link, youtube link or PDF file)
4. Visit your own KnowledgeBot and ask some questions!