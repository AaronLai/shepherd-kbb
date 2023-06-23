import { AddIcon } from "@chakra-ui/icons"
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Input } from "@chakra-ui/react"
import React from "react"

export default function CreateProjectModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [projectName, setProjectName] = React.useState('')
    const createProject = () => {
        console.log(projectName)
        onClose()
        setProjectName("")
    }
    const nameIsValid = () => {
        return projectName.length > 5 && projectName.length < 46
    }
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
              <Input placeholder='Project Name' value={projectName} onChange={(e)=>setProjectName(e.target.value)} />
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