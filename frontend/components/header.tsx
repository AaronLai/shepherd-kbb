import { Box, Button, ButtonGroup, Flex, Text, Spacer } from '@chakra-ui/react'
import React from 'react'
import Link from 'next/link'

export default function Header(){
    return(
        <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box p='2'>
                <Text fontSize='xl' fontWeight={700}>852Shepherd</Text>
            </Box>
            <Spacer />
            <ButtonGroup gap='2'>
                <Link href='/signup'>
                    <Button colorScheme='teal' marginTop='2'>Sign Up</Button>
                </Link>
                <Link href='/login'>
                    <Button colorScheme='teal' marginTop='2' marginRight='4'>Log in</Button>
                </Link>
            </ButtonGroup>
        </Flex>
    )
}