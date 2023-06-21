import { Box, Button, ButtonGroup, Flex, Text, Spacer } from '@chakra-ui/react'
import React from 'react'
import Link from 'next/link'

export default function Header(){
    const loggedIn = false
    return(
        <Flex minWidth='max-content' alignItems='center' gap='2' paddingX="4" paddingY="2" borderBottom="2px">
            <Box p='2'>
                <Text fontSize='xl' fontWeight={700}>852Shepherd</Text>
            </Box>
            <Spacer />
            <ButtonGroup gap='2' alignItems='center' variant='outline'>
                {
                    loggedIn? (
                        <Link href='/'>
                            <Button>Logout</Button>
                        </Link>
                    ) : (
                        <>
                        <Link href='/auth'>
                            <Button borderColor='#91FF64' borderWidth="2px" textColor="blue.900" rounded="full">Sign Up/Login</Button>
                        </Link>
                        </>
                    )
                }
            </ButtonGroup>
        </Flex>
    )
}