import React from "react";
import Router from "next/router";
import {
  Flex,
  Heading,
  VStack,
  Text,
  Box,
  HStack,
  StackDivider,
  Center,
  ButtonGroup,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Event from "../../components/Event/Event";
import StallRequest from "../../components/Event/StallRequest";
import { signOut, getSession } from "next-auth/react";

const OrganizerDashboard = ({ session, events, stallRequests }) => {
  return (
    <Flex direction="column" align="center">
      <Heading mt={10} as="h3" size="lg">
        My Events
      </Heading>
      <Flex align="center" w="50%" direction="column" mt={8}>
        <ButtonGroup mt={1} mb={5} size="sm" isAttached variant="solid">
          <Button
            mr="-px"
            onClick={() => {
              Router.push("/organizer/events/create-event");
            }}
          >
            Add New Event
          </Button>
          <IconButton
            onClick={() => {
              Router.push("/organizer/events/create-event");
            }}
            aria-label="Add to friends"
            icon={<AddIcon />}
          />
        </ButtonGroup>
        {events.events.length === 0 ? (
          <Center>
            <Text>No events posted. 🥲 Click add event to add some.</Text>
          </Center>
        ) : (
          events.events.map((event) => {
            return <Event key={event._id} event={event} />;
          })
        )}
      </Flex>
      <Heading mt={10} as="h3" size="lg">
        Stall Requests
      </Heading>
      <Flex mb={10} w={["90%", "80%", "50%"]} direction="column" mt={8}>
        <HStack
          w={["100%", "100%", "100%"]}
          p={1}
          mb={5}
          borderTop="1px"
          divider={<StackDivider borderColor="gray.400" />}
          justify="space-between"
        >
          <Box>Vendor Name</Box>
          <Box>Event Name</Box> <Box>Type</Box> <Box>Date Requested</Box>
        </HStack>
        {stallRequests.stalls.length === 0 ? (
          <Center>
            <Text>No Stall Requests Made Yet. 😭</Text>
          </Center>
        ) : (
          stallRequests.stalls.map((request) => {
            const stallCategory = request.event.eventStalls.filter((stall) => {
              return stall.stallId == request.stallId;
            });

            const {
              businessName,
              businessAddress,
              businessNumber,
              businessDescription,
            } = request.vendor.extendProfile;
            const userProfile = (
              <VStack align="left">
                <Text>Business Name: {businessName}</Text>
                <Text>Store Number: {businessNumber}</Text>
                <Text>Store Address: {businessAddress}</Text>
                <Text>Store Bio: {businessDescription}</Text>
              </VStack>
            );
            return (
              <StallRequest
                key={request._id}
                vendorName={`${request.vendor.firstname} ${request.vendor.surname}`}
                eventName={request.event.name}
                stallCategory={stallCategory[0].category}
                date={request.createdAt}
                userProfile={userProfile}
              />
            );
          })
        )}
      </Flex>
    </Flex>
  );
};

export default OrganizerDashboard;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let events;
  let stallRequests;
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  } else {
    const eventsEndpoint = `${process.env.NEXTAUTH_URL}/api/v1/events?organizerId=${session.userId}`;
    const eventsResponse = await fetch(eventsEndpoint);
    events = await eventsResponse.json();

    const organizersEventIds = events.events.map((event) => {
      return event._id;
    });
    const JSONdata = JSON.stringify(organizersEventIds);
    const stallRequestEndpoint = `${process.env.NEXTAUTH_URL}/api/v1/stalls/?organizersEventIds=${JSONdata}`;

    const requestsResponse = await fetch(stallRequestEndpoint);
    stallRequests = await requestsResponse.json();
  }

  return {
    props: {
      events: events,
      session: session,
      stallRequests: stallRequests,
    },
  };
}
