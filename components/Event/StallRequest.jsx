import React from "react";
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
} from "@chakra-ui/react";
import ApproveAlertDialog from "../Event/ApproveAlertDialog";
import DeclineAlertDialog from "../Event/DeclineAlertDialog";

const StallRequest = ({
  vendorName,
  eventName,
  stallCategory,
  date,
  userProfile,
  requestId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        mt={2}
        mb={2}
        p={2}
        border="2px"
        borderColor="gray.400"
        cursor="pointer"
        justify="space-between"
        onClick={onOpen}
      >
        <Box>{vendorName}</Box> <Box>{eventName}</Box>{" "}
        <Box>{stallCategory}</Box> <Box>{`${date.split("T")[0]}`}</Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{eventName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{userProfile}</ModalBody>

          <ModalFooter>
            <DeclineAlertDialog
              closeOuterDialog={onClose}
              requestId={requestId}
            />

            <ApproveAlertDialog
              closeOuterDialog={onClose}
              requestId={requestId}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StallRequest;
