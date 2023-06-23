import { Box, Button, ButtonGroup, Flex, Text, Spacer, Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
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
            <Link href="/">
               <Box p='2' onClick={()=>router.push('/auth')}>
                    <Text fontSize='xl' fontWeight={700}>852Shepherd</Text>
                </Box> 
            </Link>
            <Box marginX="10">
                <Flex gap="10">
                    <Link href="/projects"><Text>Projects</Text></Link>
                    <Link href="/chatbot/123"><Text>Chatbox</Text></Link>
                </Flex>
            </Box>
            <Spacer />
            <Menu>
                <MenuButton>
                    <Avatar src='https://bit.ly/broken-link' width="10" height="10" />
                </MenuButton>
                <MenuList gap="2">
                    {/* <MenuItem _hover={{bgColor: "gray.200"}} borderBottom="1px" borderColor="gray.200" paddingY="3">Your Profile</MenuItem> */}
                    <MenuItem _hover={{bgColor: "gray.200"}} paddingY="3">
                        {
                            user == null? (
                                <Link href='/auth'>
                                    Sign Up/Login
                                </Link>
                            ) : (
                                <>
                                <Text onClick={()=>logout()}>Logout</Text>
                                </>
                            )
                        }
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )
}