import Head from 'next/head'
import { Button, Center, Container, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useAppContext } from '@/context/auth'
import Image from 'next/image'


export default function Home() {
  const {jwt} = useAppContext()
  return (
    <>
      <Head>
        <title>852Shepherd - Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container marginY="20">

        <Text fontSize='4xl' marginBottom="4" textAlign='center' fontWeight='bold'>Build your GPT in 1 minute without coding!</Text>

        <Image
          src="/intro.png"
          width={500}
          height={500}
          alt="Introduction"
        />


        <Center marginTop="5">
          <Link href={jwt?"/projects":"/auth"}>
            <Button bg='#55EF16' alignItems='center'>Try it out!</Button>
          </Link>
        </Center>
      
      </Container>
    </>
  )
}
