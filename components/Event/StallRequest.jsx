import React from 'react'
import {
    Flex,
    Box,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

const StallRequest = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Flex p={2} border='2px' borderColor='gray.400' cursor="pointer" justify="space-between" onClick={onOpen}><Box>Vendor Name</Box> <Box>Event Name</Box> <Box>Stall Category</Box> <Box>Date Made</Box></Flex>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Event Name</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Vendor Information
            </ModalBody>
  
            <ModalFooter>
             <Button colorScheme="red" mr={3}>Reject</Button>
              <Button colorScheme="green">Accept</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default StallRequest