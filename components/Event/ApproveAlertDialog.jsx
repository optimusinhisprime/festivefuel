import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  useToast,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
const axios = require("axios");

export default function ApproveAlertDialog({ requestId, closeOuterDialog }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const cancelRef = React.useRef();

  const approveRequest = (requestId) => {
    setLoading(true);

    axios
      .patch(`/api/v1/stalls?stallRequestId=${requestId}`, {
        requestStatus: "approved",
      })
      .then(function (response) {
        setLoading(false);
        onClose();
        closeOuterDialog();
        toast({
          title: "Request approved.",
          description: "The vendor will be notified.",
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
      <Button m={5} colorScheme="green" onClick={onOpen}>
        Approve
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
          <AlertDialogHeader>Accept Request?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to approve the request?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              isLoading={loading}
              onClick={() => {
                approveRequest(requestId);
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
