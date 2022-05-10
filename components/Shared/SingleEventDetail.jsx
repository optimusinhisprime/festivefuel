import React from "react";
import {
  Flex,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
const SingleEventDetail = ({ eventDetail, value }) => {
  return (
    <Flex justify="start">
      <Text fontSize="lg" style={{ margin: "auto 10px" }}>
        {eventDetail}:
      </Text>
      <Editable defaultValue={value}>
        <EditablePreview border="1px" borderColor="gray.400" p={2} />
        <EditableInput />
      </Editable>
    </Flex>
  );
};

export default SingleEventDetail;
