import React, { useState } from "react";
import {
  Input,
  FormLabel,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stack,
  useToast,
  Box,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
const axios = require("axios");
const shortid = require("shortid");
const AddNewStallDrawer = ({ event }) => {
  const toast = useToast();
  const currentStallList = event.eventStalls;
  const [stallObj, setStallObject] = useState({
    stallId: shortid.generate(),
    category: "",
    price: "",
    available: 0,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const [loading, setLoading] = useState(false);

  const saveStall = () => {
    currentStallList.push(stallObj);
    console.log(currentStallList);
    setLoading(true);
    axios
      .patch(`/api/v1/events/${event._id}`, {
        eventStalls: currentStallList,
      })
      .then(() => {
        setLoading(false);
        onClose();
        toast({
          title: "Stall Added Successfully.",
          description: "Refresh the page to view it.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(() => {
        setLoading(false);
        toast({
          title: " Failed to add stall.",
          description: "Something went wrong. Try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Add New Stall
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Add a new stall</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="category">Stall Category</FormLabel>
                <Input
                  onChange={(e) => {
                    console.log(e.target.value);
                    setStallObject((prevState) => ({
                      ...prevState,
                      category: e.target.value,
                    }));
                  }}
                  ref={firstField}
                  id="category"
                  placeholder="Liquor"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="price">Stall Price</FormLabel>
                <Input
                  onChange={(e) => {
                    console.log(e.target.value);
                    setStallObject((prevState) => ({
                      ...prevState,
                      price: e.target.value,
                    }));
                  }}
                  id="price"
                  placeholder="P2000.00"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="available">
                  How many are available?
                </FormLabel>
                <Input
                  onChange={(e) => {
                    console.log(e.target.value);
                    setStallObject((prevState) => ({
                      ...prevState,
                      available: e.target.value,
                    }));
                  }}
                  type="number"
                  id="available"
                  placeholder="10"
                />
              </Box>
            </Stack>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button isLoading={loading} onClick={saveStall} colorScheme="blue">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddNewStallDrawer;
