import { AddIcon } from "@chakra-ui/icons"
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Input, Select, useToast } from "@chakra-ui/react"
import React from "react"
import axios from "axios"
import { ErrorCallback } from "typescript"

export default function CreateProjectModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const [name, setName] = React.useState('')
    const [role, setRole] = React.useState('')
    const [visibility, setVisibility] = React.useState("Private")
    const createProject = async () => {
      await axios.post('/api/project', {
          name: name,
          role: role,
          status: visibility
      },
      {
        headers: {
          token: localStorage.getItem('jwt')
        }
      }).then((res) => {
          console.log(res.data)
          toast({
            title: 'Successfully created project!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
          setTimeout(() => {
            window.location.reload()
          }, 3000)
      })
      .catch((error) => {
        console.log(error)
        toast({
            title: 'Cannot create project',
            description: error.response.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
        })
      })
    }
    const nameIsValid = () => {
        return name.length >= 5 && name.length < 46 && (visibility == "private" || visibility == "public")
    }
    React.useEffect(() => {
      console.log(visibility)
    }, [visibility])
    return (
      <>
        <Button bgColor="#91FF64" size="lg" marginY="4" onClick={onOpen}><AddIcon w="4" h="4" mr="2" /><Text fontSize="md">New Project</Text></Button>
  
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size="lg" >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a New Project</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb='1rem'>
                What is the name of your new project?
              </Text>
              <Input placeholder='Project Name(at least 5 characters)' value={name} onChange={(e)=>setName(e.target.value)} />
              <Text mb='1rem' marginTop="4">
                What is the visibility of your project?
              </Text>
              <Select placeholder='Select visibility' onChange={(e)=>setVisibility(e.target.value)}>
                <option value='private'>Private</option>
                <option value='public'>Public</option>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button bgColor="#91FF64" border="2px" onClick={()=>createProject()} isDisabled={!nameIsValid()}>Create</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }