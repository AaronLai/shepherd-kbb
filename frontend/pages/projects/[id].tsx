import Head from 'next/head'
import React from 'react'
import { Button, Card, Container, Flex, Input, InputGroup, InputRightElement, Spacer, Tab, TabList, TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody, Td, Text, Textarea, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import { useAppContext } from '@/context/auth'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useRouter } from 'next/router'
import { headers } from 'next/dist/client/components/headers'
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
export default function Chatbot() {
    const {jwt, setJwtToken} = useAppContext()
    const router = useRouter()
    const { id } = router.query;
    const projectId = id || ''; 
    const toast = useToast()
    const [files, setFiles] = React.useState<File | null>(null)
    const [youtubeLinks, setYoutubeLinks] = React.useState<string>("")
    const [youtubeLinkInput, setYoutubeLinkInput] = React.useState('')
    const [webLinkInput, setWebLinkInput] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [userQuestion, setUserQuestion] = React.useState("")
    const [response, setResponse] = React.useState("")
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
        catch(err: any){
            console.log(err)
            toast({
                title: 'Upload YouTube link failed',
                description: err.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            setLoading(false)
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
        catch(err: any){
            console.log(err)
            toast({
                title: 'Upload webpage link failed',
                description: err.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            setLoading(false)
        }
        setWebLinkInput("")
    }
    const selectFile = () => {
        let file_selector = document.getElementById("file-selector")
        file_selector?.click()
    }
    const useFile = (event: React.ChangeEvent<HTMLInputElement>) => {

        const fileList = event.target.files;
        fileList != null ? setFiles(fileList[0]) : setFiles(null);
      };
    const uploadFile = async (file: any) => {


        try {
            let bodyFormData = new FormData();
            bodyFormData.append("file", file);
            if (Array.isArray(projectId)) {
                // Assuming you want to use the first value from the array
                bodyFormData.append("projectId", projectId[0]);
              } else {
                bodyFormData.append("projectId", projectId);
              }
            
            const response = await axios.post(`${publicRuntimeConfig.API_ENDPOINT}/builder/uploadFile`, bodyFormData , { headers: {
                "Content-Type": "multipart/form-data",
                'token': localStorage.getItem("jwt")

              }});
            console.log(response.data)
            toast({
                title: 'Upload file File uploaded successfully',
                description: response.data.message,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
                    
        } catch (error: any) {
            console.log(error)
            toast({
                title: 'Upload file failed',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            setLoading(false)
        }
    }
    React.useEffect(() => {
        console.log(files)
    }, [files])
    const submitChat = async () => {
        setLoading(true)
        try {
            const response = await axios.post('/api/chatting', {
                projectId: projectId,
                text: userQuestion
            });
            const { answer } = response.data;
            setResponse(answer)
            setLoading(false)
        } catch (error : any ) {
            console.error(error.response.data);
            toast({
                title: 'Cannot receive response',
                description: "Please check your network connection and prompt",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        setLoading(false)
    }
    //protected page
    const getLocalStorageItem = (key: string) => {
        if (typeof window !== undefined){
        return window.localStorage.getItem(key)
        }
    };
    React.useEffect(() => {
        setJwtToken(getLocalStorageItem("jwt"));
        if(typeof window !== "undefined" && localStorage.getItem("jwt")){
        }
        else{
            router.push('/auth')
        }
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
                            onChange={useFile}
                            border="0"
                            key={0}
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
                    </Card>
                    
                    <Card padding="4" gap="2" bgColor="gray.100" letterSpacing="0" marginTop="4">
                        <Text fontSize="lg" marginBottom="2" fontWeight="bold">Testing Section</Text>
                        <Textarea placeholder='Enter a prompt to ask questions!' value={userQuestion} onChange={(e)=>setUserQuestion(e.target.value)} />
                        <Flex marginTop="2">
                            <Spacer />
                            <Button bgColor="#91FF64" border="2px" onClick={()=>submitChat()} isLoading={loading}>Chat!</Button>
                        </Flex>
                        {
                            response !== ""? (
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

