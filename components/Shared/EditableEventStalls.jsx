import { Flex, Text, Box } from "@chakra-ui/react";
import React from "react";
import AddNewStallDrawer from "../Shared/AddNewStallDrawer";
const EditableEventStalls = ({ event }) => {
  const eventStalls = event.eventStalls.map((stall) => {
    return (
      <Flex mt={10} mb={10} key={stall._id} justify="space-between">
        <Text>{stall.category}</Text>
        <Text>{stall.price}</Text>
        <Text>{stall.available}</Text>
      </Flex>
    );
  });
  return (
    <Flex p={5} w="50%" direction="column">
      <AddNewStallDrawer event={event} />
      <Box>{eventStalls}</Box>
    </Flex>
  );
};

export default EditableEventStalls;
