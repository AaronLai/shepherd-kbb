import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Button, Center, Container, Text } from '@chakra-ui/react'
import Link from 'next/link'


export default function Home() {
  return (
    <>
      <Head>
        <title>852Shepherd - Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container marginY="20">
        <Text fontSize='4xl' marginBottom="4" textAlign='center' fontWeight='bold'>Welcome to 852Shepherd!</Text>
        <Text size="md" marginY="2">
        &quot;KnowledgeBot Builder&quot; - Empowering You to Create Intelligent AI-Assistants without Code!
        </Text>
        <Text size="md" marginY="2">
          KnowledgeBot Builder is a revolutionary no-code tool designed to simplify the process of building a comprehensive knowledge AI-assistant. With just a few clicks, users can effortlessly upload files, URLs of webpages, or even YouTube videos to create their very own personalized knowledge database.
        </Text>
        <Text size="md" marginY="2">
          Engage in seamless conversations with your AI-assistant, as it leverages your uploaded content to provide accurate and insightful responses. Whether you&apos;re an individual seeking a personal tutor or an enterprise in need of an internal knowledge management system, KnowledgeBot Builder is the ultimate solution.
        </Text>
        <Text size="md" marginY="2">
          In addition, KnowledgeBot Builder will offer a variety of templates tailored for different roles, including teachers, assistants, and company coaches. These templates will provide pre-designed prompts and conversation flows specifically designed to enhance the interaction and effectiveness of each role.
        </Text>
        <Text size="md" marginY="2">
          At KnowledgeBot Builder, we understand the user&apos;s needs for a seamless experience. Simply upload your documents or provide URLs, and leave the rest to us. We will handle software engineering and prompt engineering.
        </Text>
        <Center marginTop="20">
          <Link href="/auth">
            <Button bg='#55EF16' alignItems='center'>Try it out!</Button>
          </Link>
        </Center>
      
      </Container>
    </>
  )
}
