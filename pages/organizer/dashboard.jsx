import React from "react";
import { Flex, Heading } from '@chakra-ui/react'
import Event from "../../components/Event/Event"
import StallRequest from "../../components/Event/StallRequest";

const OrganizerDashboard = () => {
  return <Flex h="100vh" direction="column" align="center">
    <Heading mt={10} as='h3' size='lg'>
    My Events
  </Heading>
  <Flex align="center" w="50%" direction="column" mt={8}>
    <Event/>
    
  </Flex>
  <Heading mt={10} as='h3' size='lg'>
    Stall Requests
  </Heading>
  <Flex w="50%" direction="column" mt= {8}>
  <StallRequest/>
  </Flex>
  </Flex>;
};

export default OrganizerDashboard;
