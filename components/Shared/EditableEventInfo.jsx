import React from "react";
import {
  Flex,
  Text,
  Editable,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";
import SingleEventDetail from "./SingleEventDetail";

const EditableEventInfo = ({ event }) => {
  const { eventName, venue, date, time, description } = event;

  return (
    <Flex mt={10} mb={10} w="50%" direction="column">
      <SingleEventDetail eventDetail="Event Name" value={eventName} />
      <SingleEventDetail eventDetail="Date" value={date} />
      <SingleEventDetail eventDetail="Time" value={time} />
      <SingleEventDetail eventDetail="Venue" value={venue} />
      <Flex justify="start">
        <Text fontSize="lg" style={{ margin: "auto 10px" }}>
          Description:
        </Text>
        <Editable defaultValue={description}>
          <EditablePreview border="1px" borderColor="gray.400" p={2} />
          <EditableTextarea />
        </Editable>
      </Flex>
    </Flex>
  );
};

export default EditableEventInfo;
