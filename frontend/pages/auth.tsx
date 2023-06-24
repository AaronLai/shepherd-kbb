import Head from 'next/head'
import React from 'react'
import { Button, Card, Container, Flex, Input, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast } from '@chakra-ui/react'
import { useAppContext } from "../context/auth"
import { useRouter } from 'next/router'
import axios from 'axios';

export default function Auth() {
  const {setJwtToken} = useAppContext()
  const toast = useToast()
  const router = useRouter()
  const [loginUser, setLoginUser] = React.useState({
    email: '',
    password: ''
  })
  const [signupUser, setSignupUser] = React.useState({
    email: '',
    username: '',
    password: '',
    password2: ''
  })


  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', {
        email: loginUser.email,
        password: loginUser.password,
      });
  
      const { jwt } = response.data;
  
      localStorage.setItem('jwt', jwt);
      setJwtToken(jwt)
      router.push('/projects');
    } catch (error: any) {
      console.log(error)
      toast({
          title: 'Login failed',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
      })
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('/api/signup', {
        email: signupUser.email,
        name: signupUser.username,
        password: signupUser.password,
      });
  
      const { jwt } = response.data;
  
      localStorage.setItem('jwt', jwt);
      setJwtToken(jwt)
      router.push('/projects');
    } catch (error : any ) {
      console.error(error.response.data);
      toast({
          title: 'Sign up failed',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
      })
    }
  };

  const handleLoginInput = (event: any) => {
    setLoginUser({...loginUser, [event.target.id]: event.target.value })
  }
  const handleSignupInput = (event: any) => {
    setSignupUser({...signupUser, [event.target.id]: event.target.value })
  }
  const containsNumbersAndSymbols = (str: String) => {
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      if ((charCode >= 48 && charCode <= 57) || // Check if character is a number
          (charCode >= 33 && charCode <= 47) || // Check if character is a symbol
          (charCode >= 58 && charCode <= 64) || // Check if character is a symbol
          (charCode >= 91 && charCode <= 96) || // Check if character is a symbol
          (charCode >= 123 && charCode <= 126)) { // Check if character is a symbol
        return true;
      }
    }
    return false;
  }
  const isValid = () => {
    return signupUser.email.length > 5 && signupUser.username.length > 5 && signupUser.password.length > 5 && signupUser.password === signupUser.password2 && containsNumbersAndSymbols(signupUser.password)
  }
  React.useEffect(() => {
    console.log(signupUser)
  }, [signupUser])
  React.useEffect(() => {
    console.log(loginUser)
  }, [loginUser])

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container marginY="16">
          <Text fontSize="2xl" textAlign='center' fontWeight='bold'>Sign in to 852Shepherd</Text>
          <Card bgColor="gray.100" marginY="10" padding="4">
            <Tabs colorScheme="red">
              <TabList>
                <Tab onClick={()=>setSignupUser({ email: '', username: '', password: '', password2: ''})}>Login</Tab>
                <Tab onClick={()=>setLoginUser({ email: '', password: ''})}>Signup</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Input placeholder='Enter your email' value={loginUser.email} onChange={handleLoginInput} id="email" marginY="2" />
                  <Input placeholder='Enter your password' type="password" value={loginUser.password} onChange={handleLoginInput} id="password" marginY="2" />
                  <Flex>
                    <Spacer />
                    <Button bgColor="#91FF64" border="2px" onClick={()=>handleLogin()}>Login</Button>
                  </Flex>
                </TabPanel>
                <TabPanel>
                <Input placeholder='Enter your email' value={signupUser.email} onChange={handleSignupInput} id="email" marginY="2" />
                <Input placeholder='Enter your username' value={signupUser.username} onChange={handleSignupInput} id="username" marginY="2" />
                <Input placeholder='Enter your password' type="password" value={signupUser.password} onChange={handleSignupInput} id="password" marginY="2" />
                <Input placeholder='Re-enter your password' type="password" value={signupUser.password2} onChange={handleSignupInput} id="password2" marginY="2" />
                <Flex>
                  <Spacer />
                  <Button isDisabled={!isValid()} bgColor="#91FF64" border="2px" onClick={()=>handleSignup()}>Sign Up</Button>
                </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Card>
        </Container>
      </main>
    </>
  )
}
