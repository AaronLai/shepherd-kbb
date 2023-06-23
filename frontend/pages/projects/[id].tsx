import Head from 'next/head'
import React from 'react'
import { Button, Card, Container, Flex, Input, InputGroup, InputRightElement, Spacer, Tab, TabList, TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody, Td, Text, Textarea, Th, Thead, Tr } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useAppContext } from '@/context/auth'
import Link from 'next/link'
import { AddIcon, ArrowForwardIcon, ArrowRightIcon, CloseIcon } from '@chakra-ui/icons'
import { pass_youtube, upload_file } from '@/query/builder'
import axios from 'axios'

export default function Chatbot() {
    const {jwt, setJwtToken} = useAppContext()
    const router = useRouter()
    const [files, setFiles] = React.useState<File | null>(null)
    const [youtubeLinks, setYoutubeLinks] = React.useState<string>("")
    const [youtubeLinkInput, setYoutubeLinkInput] = React.useState('')
    const [webLinks, setWebLinks] = React.useState<string>("")
    const [webLinkInput, setWebLinkInput] = React.useState('')
    const [testPrompt, setTestPrompt] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [response, setResponse] = React.useState("")
    const saveProject = () => {
        console.log("saving...")
    }
    const addYoutubeLink = async () => {
        try{
            setLoading(true)
            const response = await axios.post('/api/youtube_pass', {
                url: youtubeLinkInput
            })
            setYoutubeLinks(response.data.url)
            setYoutubeLinkInput("")
            setLoading(false)
        }
        catch(err){
            console.log(err)
        }
        setYoutubeLinkInput("")
    }
    const addWebLinks = async () => {
        try{
            setLoading(true)
            const response = await axios.post('/api/webpage_read', {
                url: webLinkInput
            })
            setYoutubeLinks(response.data.url)
            setYoutubeLinkInput("")
            setLoading(false)
        }
        catch(err){
            console.log(err)
        }
        setWebLinkInput("")
    }
    const selectFile = () => {
        let file_selector = document.getElementById("file-selector")
        file_selector?.click()
    }
    const useFile = (fileList: any) => {
        fileList!=null?setFiles(fileList[0]):null
    }
    const uploadFile = async (file: any) => {
        try {
            let bodyFormData = new FormData();
            bodyFormData.append("file", file);
            const response = await axios.post("/api/file_upload", {file: file}, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log(response.data)
                    
        } catch (error) {
            console.log(error)
        }
    }
    React.useEffect(() => {
        console.log(files)
    }, [files])
    const submitChat = () => {
        setLoading(true)
        setTimeout(()=> {
            setResponse("response")
            setLoading(false)
        }, 3000)
    }
    //protected page
    const getLocalStorageItem = (key: string) => {
        if (typeof window !== undefined){
        return window.localStorage.getItem(key)
        }
    };
    React.useEffect(() => {
        setJwtToken(getLocalStorageItem("jwt"));
    }, []);
    return (
        <>
        <Head>
            <title>project_name - Chatbot</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {
            jwt !== null? (
                <main>
                    <Container marginY="20">
                    <Text fontSize="2xl" textAlign='center' fontWeight='bold' marginBottom="8">project_name</Text>
                    <Text marginBottom="4">You can enter or upload multiple types of media here, including plain text, PDF/Word files and URLs of YouTube and websites. Why not try it out below!</Text>
                    <Card padding="4" gap="2" bgColor="gray.100" letterSpacing="0">
                        <Text fontSize="lg" marginBottom="2" fontWeight="bold">Input Section</Text>
                        <Text fontSize="md" marginTop="2">Please upload files here: (accepted file types: .pdf, .doc, .docx)</Text>
                        <Button onClick={()=>selectFile()} width="fit-content" border="2px">
                            Select Files
                        </Button>
                        <Input
                            type="file"
                            sx={{
                                "::file-selector-button": {
                                border: "none",
                                outline: "none",
                                mr: 2,
                                }
                            }}
                            accept=".doc, .docx, .pdf"
                            display="none"
                            onChange={(e) => useFile(e.target.files)}
                            border="0"
                            id="file-selector"
                        />
                        {
                            files != null
                            ?(
                                <Flex gap="1" marginLeft="2">
                                    <Text fontSize="md" letterSpacing="0">{files.name}</Text>
                                    <Spacer />
                                    <Button variant="link" onClick={()=>setFiles(null)}>
                                        <CloseIcon color="red.500" />
                                    </Button>
                                    <Button variant="link" onClick={()=>uploadFile(files)}>
                                        <AddIcon color="green.500" />
                                    </Button>
                                </Flex>
                            )
                            :null
                        }
                        <Text fontSize="md" marginTop="2">Please enter web URLs here:</Text>
                        <InputGroup>
                            <Input placeholder='Web URL:' value={webLinkInput} onChange={(e)=>setWebLinkInput(e.target.value)} />
                            <InputRightElement>
                                <Button onClick={()=>addWebLinks()} variant="link" isDisabled={webLinkInput.length==0}><AddIcon color='green.500' /></Button>
                            </InputRightElement>
                        </InputGroup>
                        <Text fontSize="md" marginTop="2">Please enter YouTube Links here:</Text>
                        <InputGroup>
                            <Input placeholder='Youtube Link:' value={youtubeLinkInput} onChange={(e)=>setYoutubeLinkInput(e.target.value)} />
                            <InputRightElement>
                                <Button onClick={()=>addYoutubeLink()} variant="link" isDisabled={youtubeLinkInput.length==0}><AddIcon color='green.500' /></Button>
                            </InputRightElement>
                        </InputGroup>
                        <Flex marginTop="4">
                            <Button onClick={()=>router.back()} bgColor="gray.200">Back</Button>   
                            <Spacer />
                            <Button onClick={() => saveProject()} bgColor="#91FF64" border="2px">
                                Save
                            </Button>
                        </Flex>
                    </Card>
                    
                    <Card padding="4" gap="2" bgColor="gray.100" letterSpacing="0" marginTop="4">
                        <Text fontSize="lg" marginBottom="2" fontWeight="bold">Testing Section</Text>
                        <Textarea placeholder='Enter a prompt to ask questions!' />
                        <Flex marginTop="2">
                            <Spacer />
                            <Button bgColor="#91FF64" border="2px" onClick={()=>submitChat()} isLoading={loading}>Chat!</Button>
                        </Flex>
                        {
                            response.length>0? (
                                <>
                                    <Text fontSize="lg" marginBottom="2" marginTop="4" fontWeight="bold">Response: </Text>
                                    <Text fontSize="md">{response}</Text>
                                </>
                            ):null
                        }
                    </Card>
                    </Container>
                </main>
            ):<></>
        }
    </>
    )
}

