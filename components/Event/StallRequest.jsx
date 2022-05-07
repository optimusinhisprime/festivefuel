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

const StallRequest = ({vendorName, eventName, stallCategory, date, userProfile}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Flex mt={2} mb={2} p={2} border='2px' borderColor='gray.400' cursor="pointer" justify="space-between" onClick={onOpen}><Box>{vendorName}</Box> <Box>{eventName}</Box> <Box>{stallCategory}</Box> <Box>{`${date.split("T")[0]}`}</Box></Flex>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{eventName}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
             {userProfile}
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