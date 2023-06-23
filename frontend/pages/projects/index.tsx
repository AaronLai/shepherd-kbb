import Head from 'next/head'
import React from 'react'
import { Button, Card, Container, Flex, Input, Spacer, Tab, TabList, TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useAppContext } from '@/context/auth'
import Link from 'next/link'
import { AddIcon, ArrowForwardIcon, ArrowRightIcon } from '@chakra-ui/icons'
import CreateProjectModal from '@/components/create-project-modal'

export default function ProjectList() {
    const {user} = useAppContext()
    const router = useRouter()
    React.useEffect(() => {
        console.log(user)
        if(user == null){
            router.push('/auth')
        }
    }, [])
    const sample_data = [
        {name: "Project1", lastUpdated: Date.now(), id: '123'},
        {name: "Project2", lastUpdated: Date.now(), id: '456'},
        {name: "Project3", lastUpdated: Date.now(), id: '789'},
    ]
    return (
        <>
        <Head>
            <title>Project List</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {
            user != null? (
                <main>
                    <Container marginY="20">
                    <Text fontSize="2xl" textAlign='center' fontWeight='bold' marginBottom="12">New Projects</Text>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur culpa aspernatur tempore quod placeat sequi optio est voluptas enim illo voluptatibus dolor facilis fugit, dicta consequatur id soluta deleniti veritatis.</Text>
                    <Flex>
                        <Spacer />
                        <CreateProjectModal />
                    </Flex>
                    <TableContainer>
                        <Table variant="striped" colorScheme="green">
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Last Updated</Th>
                                    <Th>Visit Project</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    sample_data.map((item) => {
                                        return(
                                        <Tr>
                                            <Td>{item.name}</Td>
                                            <Td>{moment(item.lastUpdated).format('lll')}</Td>
                                            <Td textAlign="center"><Link href={`/projects/${item.id}`}><Button variant="link"><ArrowForwardIcon w="6" h="6" /></Button></Link></Td>
                                        </Tr>
                                        )
                                    })
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                    </Container>
                </main>
            ):<></>
        }
    </>
    )
}