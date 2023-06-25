import Head from 'next/head'
import React from 'react'
import { Button, Card, Container, Flex, Input, InputGroup, InputRightElement, Spacer, Text, Textarea, useToast } from '@chakra-ui/react'
import { useAppContext } from '@/context/auth'
import { AddIcon, CloseIcon, CopyIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useRouter } from 'next/router'
import getConfig from 'next/config';
import moment from 'moment'
import Link from 'next/link'
const { publicRuntimeConfig } = getConfig();
export default function ProjectDetails() {
    const {jwt} = useAppContext()
    const router = useRouter()
    const { id } = router.query;
    const projectId = id || ''; 
    const toast = useToast()
    const [files, setFiles] = React.useState<File | null>(null)
    const [youtubeLinkInput, setYoutubeLinkInput] = React.useState('')
    const [webLinkInput, setWebLinkInput] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [userQuestion, setUserQuestion] = React.useState("")
    const [response, setResponse] = React.useState("")
    const [project, setProject] = React.useState<any>(null)
    const [loadingStep, setLoadingStep] = React.useState("")
    const [documents, setDocuments] = React.useState<any>([])
    React.useEffect(() => {
        if(typeof window !== "undefined" && localStorage.getItem("jwt")!== null){
            const query_id = window.location.pathname.split('/')[window.location.pathname.split('/').length-1]
            const getProjectDetails = async () => {
                try{
                    const res = await axios.get(`/api/project/${query_id}`)
                    setProject(res.data.project)
                    console.log(res.data.project)
                    try {
                        const docResponse = await axios.get(`/api/project/${query_id}/documents`, {
                            headers: {
                                'token': localStorage.getItem("jwt")
                            }
                        })
                        console.log(docResponse.data.documents)
                        setDocuments(docResponse.data.documents)
                    }
                    catch(err){
                        console.log(err)
                    }
                }
                catch(err){
                    console.log(err)
                }
            }
            getProjectDetails()
        }
        else{
            router.push('/auth')
        }
    }, [])
    const addYoutubeLink = async () => {
        try{
            setLoading(true)
            setLoadingStep("youtube")
            const response = await axios.post('/api/youtube_pass', {
                url: youtubeLinkInput,
                projectId: project._id,
                token: jwt
            })
            setYoutubeLinkInput("")
            setLoading(false)
            toast({
                title: 'Upload YouTube link successfully!',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }
        catch(err: any){
            console.log(err)
            toast({
                title: 'In processing',
                description:'The task is in processing , please refresh the page after 30 seconds !',
                status: 'success',
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
            setLoadingStep("web")
            console.log(jwt)
            const response = await axios.post('/api/webpage_read', {
                url: webLinkInput,
                projectId: project._id,
                token: jwt
            })
            setYoutubeLinkInput("")
            setLoading(false)
            toast({
                title: 'Uploaded web link successfully!',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }
        catch(err: any){
            console.log(err)
            toast({
                title: 'In processing',
                description:'The task is in processing , please refresh the page after 30 seconds !',
                status: 'success',
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
        setLoading(true)
        setLoadingStep("file")
        try {
            let bodyFormData = new FormData();
            bodyFormData.append("file", file);
            if (Array.isArray(projectId)) {
                // Assuming you want to use the first value from the array
                bodyFormData.append("projectId", projectId[0]);
              } else {
                bodyFormData.append("projectId", projectId);
              }
            
            const response = await axios.post(`/api/file_upload`, bodyFormData , { headers: {
                'token': localStorage.getItem("jwt")

              }});
            console.log(response.data)
            setFiles(null)
            setLoading(false)
            toast({
                title: 'File uploaded successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
                    
        } catch (error: any) {
            console.log(error)
            toast({
                title: 'In processing',
                description:'The task is in processing , please refresh the page after 30 seconds !',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            setLoading(false)
        }
    }
    const submitChat = async () => {
        setLoading(true)
        setLoadingStep("chat")
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
          title: 'In processing',
                description:'The task is in processing , please refresh the page after 30 seconds !',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }
        setLoading(false)
    }
    return (
        <>
        <Head>
            <title>Project Details</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {
            jwt? (
                <main>
                    <Container marginY="20">
                    <Text fontSize="2xl" textAlign='center' fontWeight='bold' marginBottom="8">{project!=null?project.name:"project_name"}</Text>
                    <Text marginBottom="4">You can enter or upload multiple types of media here, including plain text, PDF/Word files and URLs of YouTube and websites. Why not try it out below!</Text>
                    <Card padding="4" gap="2" bgColor="gray.100" letterSpacing="0">
                        <Text fontSize="lg" marginBottom="2" fontWeight="bold">Input Section</Text>
                        <Text fontSize="md" marginTop="2">Document Count: {project!=null?project.document_count:0}</Text>
                        <Text fontSize="md" marginTop="2">Please upload file here: (accepted file types: .pdf, .doc, .docx)</Text>
                        <Button onClick={()=>selectFile()} width="fit-content" border="2px" isLoading={loading && loadingStep == "file"}>
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
                        {
                            documents.filter((item: any) => item.category == "file").length
                            ?<Text fontSize="md" marginTop="2">Previously uploaded files:</Text>
                            :null
                        }
                        {
                            documents.filter((item: any) => item.category == "file").map((fileItem: any) => {
                                return (
                                    <Flex key={fileItem._id} gap="1" marginLeft="2"  noOfLines={1}>{fileItem.file_name}</Flex>
                                )
                                })
                        }
                        <Text fontSize="md" marginTop="2">Please enter web URL here:</Text>
                        <InputGroup>
                            <Input placeholder='Web URL:' value={webLinkInput} onChange={(e)=>setWebLinkInput(e.target.value)} />
                            <InputRightElement>
                                <Button onClick={()=>addWebLinks()} variant="link" isDisabled={webLinkInput.length==0} isLoading={loading && loadingStep == "web"}><AddIcon color='green.500' /></Button>
                            </InputRightElement>
                        </InputGroup>
                        {
                            documents.filter((item: any) => item.category == "web").length
                            ?<Text fontSize="md" marginTop="2">Previously uploaded web URLs:</Text>
                            :null
                        }
                        {
                            documents.filter((item: any) => item.category == "web").map((fileItem: any) => {
                                return (
                                    <Link href={fileItem.file_name} key={fileItem._id} target="_blank">
                                        <Flex gap="1" marginLeft="2">
                                            <Text marginY="auto" textDecoration="underline">{fileItem.file_name}</Text>
                                        </Flex>
                                    </Link>
                                )
                                })
                        }
                        <Text fontSize="md" marginTop="2">Please enter YouTube link here:</Text>
                        <InputGroup>
                            <Input placeholder='Youtube Link:' value={youtubeLinkInput} onChange={(e)=>setYoutubeLinkInput(e.target.value)} />
                            <InputRightElement>
                                <Button onClick={()=>addYoutubeLink()} variant="link" isDisabled={youtubeLinkInput.length==0} isLoading={loading && loadingStep == "youtube"}><AddIcon color='green.500' /></Button>
                            </InputRightElement>
                        </InputGroup>
                        {
                            documents.filter((item: any) => item.category == "youtube").length
                            ?<Text fontSize="md" marginTop="2">Previously uploaded YouTube links:</Text>
                            :null
                        }
                        {
                            documents.filter((item: any) => item.category == "youtube").map((fileItem: any) => {
                                return (
                                    <Link href={fileItem.file_name} key={fileItem._id} target="_blank">
                                        <Flex gap="1" marginLeft="2">
                                            <Text marginY="auto" textDecoration="underline">{fileItem.file_name}</Text>
                                        </Flex>
                                    </Link>
                                )
                                })
                        }
                    </Card>
                    
                    <Card padding="4" gap="2" bgColor="gray.100" letterSpacing="0" marginTop="4">
                        <Text fontSize="lg" marginBottom="2" fontWeight="bold">Testing Section</Text>
                        <Textarea placeholder='Enter a prompt to ask questions!' value={userQuestion} onChange={(e)=>setUserQuestion(e.target.value)} />
                        <Flex marginTop="2">
                            <Spacer />
                            <Button bgColor="#91FF64" border="2px" onClick={()=>submitChat()} isLoading={loading && loadingStep == "chat"}>Chat!</Button>
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

