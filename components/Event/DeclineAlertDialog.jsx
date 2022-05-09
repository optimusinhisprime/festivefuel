import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
const axios = require("axios");

export default function DeclineAlertDialog({ requestId, closeOuterDialog }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const cancelRef = React.useRef();

  const declineRequest = (requestId) => {
    setLoading(true);
    axios
      .delete(`/api/v1/stalls?stallRequestId=${requestId}`)
      .then(function (response) {
        setLoading(false);
        onClose();
        closeOuterDialog();
        toast({
          title: "Request rejected.",
          description: "The request has been deleted too.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        console.log(response);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <Button m={5} colorScheme="red" onClick={onOpen}>
        Reject
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Reject Request?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to reject the request?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              isLoading={loading}
              onClick={() => {
                declineRequest(requestId);
              }}
              colorScheme="green"
              ml={3}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
