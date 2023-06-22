import { Box, Button, ButtonGroup, Flex, Text, Spacer } from '@chakra-ui/react'
import React from 'react'
import Link from 'next/link'
import { useAppContext } from "../context/auth"
import { useRouter } from 'next/router'

export default function Header(){
    const { user, setUser } = useAppContext()
    const router = useRouter()
    const logout = () => {
        setUser(null)
        router.push('/auth')
    }
    return(
        <Flex alignItems='center' gap='2' paddingX="4" paddingY="2" position="fixed" top="0" width="full" zIndex="999" bgColor="white">
            <Box p='2'>
                <Text fontSize='xl' fontWeight={700}>852Shepherd</Text>
            </Box>
            <Spacer />
            <ButtonGroup gap='2' alignItems='center' variant='outline'>
                {
                    user == null? (
                        <Link href='/auth'>
                            <Button borderColor='#91FF64' borderWidth="2px" textColor="blue.900" rounded="full">Sign Up/Login</Button>
                        </Link>
                    ) : (
                        <>
                        <Button onClick={()=>logout()}>Logout</Button>
                        </>
                    )
                }
            </ButtonGroup>
        </Flex>
    )
}