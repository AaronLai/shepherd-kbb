import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Header from "../components/header"
import theme from '@/theme'
import { ContextProvider } from '@/context/auth'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ContextProvider>
        <Header />
        <Component {...pageProps} />
      </ContextProvider>
    </ChakraProvider>
  )
}
