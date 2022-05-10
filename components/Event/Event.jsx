import React from "react";
import {
  Link,
  Flex,
  Text,
  VStack,
  StackDivider,
  LinkBox,
  LinkOverlay,
  Image,
} from "@chakra-ui/react";

const Event = ({ event }) => {
  const { eventName, date, venue, images } = event;
  return (
    <LinkBox>
      <Flex
        direction={["column", "column", "row", "row"]}
        mt={2}
        mb={2}
        p={2}
        border="2px"
        borderColor="gray.400"
        w="100%"
        rounded="lg"
      >
        <LinkOverlay
          w={["100%", "100%", "50%", "40%"]}
          href={`/organizer/events/${event._id}`}
          mt="auto"
          mb="auto"
        >
          <Image h="auto" src={images[0]} />
        </LinkOverlay>
        <VStack
          p={5}
          w="100%"
          divider={<StackDivider borderColor="gray.400" />}
        >
          <Text>{eventName}</Text>
          <Text>{date}</Text>
          <Text>{venue}</Text>
          <Link href={`/organizer/events/${event._id}`} color="orange">
            View More Information
          </Link>
        </VStack>
      </Flex>
    </LinkBox>
  );
};

export default Event;
