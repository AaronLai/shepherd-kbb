import Head from 'next/head'
import React from 'react'
import { Button, Card, Container, Flex, Spacer, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useAppContext } from '@/context/auth'
import Link from 'next/link'
import { AddIcon, ArrowForwardIcon, ArrowRightIcon, ChatIcon } from '@chakra-ui/icons'
import CreateProjectModal from '@/components/create-project-modal'
import axios from 'axios'

type ProjectType = {
    _id: string;
    name: string;
    role: string;
    user_id: string;
    chat_count: Number;
    document_count: Number;
    status: string;
    create_at: string;
}

export default function ProjectList() {
    const {jwt, setJwtToken} = useAppContext()
    const [projects, setProjects] = React.useState<ProjectType[]>([])
    const router = useRouter()
    const toast = useToast()
    React.useEffect(() => {
        if(typeof window !== "undefined" && localStorage.getItem("jwt")){
            const getProjects = async () => {
                try {
                    const response = await axios.get('/api/project', {
                        headers: {
                            'token': localStorage.getItem("jwt")
                        }
                    })
                    setProjects(response.data.projects)
                    console.log(response.data)
                    setJwtToken(jwt)
                } catch (error : any ) {
                    console.error(error);
                    toast({
                        title: "Fetch fail",
                        description: error.response.data.message,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                }
            }
            getProjects();
        }
        else{
            router.push('/auth')
        }
    }, [])
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
            <title>Project List</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {
            jwt === null? <></>:(
                <main>
                    <Container maxWidth="100ch" marginY="20">
                    <Text fontSize="2xl" textAlign='center' fontWeight='bold' marginBottom="12">My Projects</Text>
                    <Text marginBottom="2">Here are you list your projects.</Text>
                    <Text marginBottom="2">Feel free to update each of it using links and files by clicking on the update column.</Text> 
                    <Text>You can also chat with it by clicking the speech bubble icon!</Text>
                    <Flex>
                        <Spacer />
                        <CreateProjectModal />
                    </Flex>
                    {
                        projects.length>0
                        ?(
                            <TableContainer>
                                <Table variant="striped" colorScheme="green">
                                    <Thead>
                                        <Tr>
                                            <Th>Name</Th>
                                            <Th>Role</Th>
                                            <Th>Status</Th>
                                            <Th>Created At</Th>
                                            <Th>Update</Th>
                                            <Th>Chat</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {projects.map((item) => {
                                            return(
                                            <Tr key={item._id}>
                                                <Td>{item.name}</Td>
                                                <Td>{item.role}</Td>
                                                <Td>{item.status}</Td>
                                                <Td>{moment(item.create_at).format("lll")}</Td>
                                                <Td><Link href={`/projects/${item._id}`}><Button variant="link"><ArrowForwardIcon w="6" h="6" /></Button></Link></Td>
                                                <Td><Link href={`/chatbot/${item._id}`}><Button variant="link"><ChatIcon w="6" h="6" /></Button></Link></Td>
                                            </Tr>
                                            )
                                        }
                                    )}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        )
                        :(
                            <>
                                <Text fontSize="2xl" marginTop="10" textColor="gray.400" fontWeight="bold" textAlign="center">Seems like you don&apos;t have any projects</Text>
                                <Text fontSize="2xl" marginTop="2" textColor="gray.400" fontWeight="bold" textAlign="center">Let&apos;s create a new one!</Text>
                            </>
                        )

                    }
                    
                    
                    </Container>
                </main>
            )
        }
    </>
    )
}