import { Box, Button, ButtonGroup, Flex, Text, Spacer, Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import Link from 'next/link'
import { useAppContext } from "../context/auth"
import { useRouter } from 'next/router'

export default function Header(){
    const { jwt, setJwtToken } = useAppContext()
    const router = useRouter()
    const logout = () => {
        setJwtToken("")
        localStorage.removeItem("jwt")
        router.push('/auth')
    }
    React.useEffect(() => {
        if(typeof window !== "undefined"){
            setJwtToken(localStorage.getItem("jwt"))
        }
    }, [])
    return(
        <Flex alignItems='center' gap='2' paddingX="4" paddingY="2" position="fixed" top="0" width="full" zIndex="999" bgColor="white">
            <Link href="/">
               <Box>
                    <Text fontSize='xl' fontWeight={700}>852Shepherd</Text>
                </Box> 
            </Link>
            <Box marginX="10">
                <Flex gap="10">
                    <Link href="/projects"><Text>Projects</Text></Link>
                </Flex>
            </Box>
            <Spacer />
            <Menu>
                <MenuButton>
                    <Avatar src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' width="10" height="10" />
                </MenuButton>
                <MenuList gap="2">
                    {/* <MenuItem _hover={{bgColor: "gray.200"}} borderBottom="1px" borderColor="gray.200" paddingY="3">Your Profile</MenuItem> */}
                        {
                            jwt? (
                                <>
                                <MenuItem _hover={{bgColor: "gray.200"}} paddingY="3" onClick={()=>logout()}>
                                    <Text>Logout</Text>
                                </MenuItem>
                                </>
                            ) : (
                                <Link href='/auth'>
                                    <MenuItem _hover={{bgColor: "gray.200"}} paddingY="3">
                                            Sign Up/Login
                                    </MenuItem>
                                </Link>
                            )
                        }
                </MenuList>
            </Menu>
        </Flex>
    )
}