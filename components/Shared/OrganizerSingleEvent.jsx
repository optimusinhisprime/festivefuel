import React from "react";
import { Flex, Box, Image } from "@chakra-ui/react";
import EditableEventInfo from "./EditableEventInfo";
import EditableEventStalls from "./EditableEventStalls";
const OrganizerSingleEvent = ({ event }) => {
  return (
    <Flex mt={10} w="100%" align="center" direction="column">
      <Box align="center">
        <Image w="30%" src={event.images[0]} alt={`${event.images[0]}`} />
      </Box>
      <EditableEventInfo event={event} />
      <EditableEventStalls event={event} />
    </Flex>
  );
};

export default OrganizerSingleEvent;
