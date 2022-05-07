import React from "react";
import { Flex, Heading, VStack, Text } from '@chakra-ui/react'
import Event from "../../components/Event/Event"
import StallRequest from "../../components/Event/StallRequest";
import { signOut, getSession } from "next-auth/react";


const OrganizerDashboard = ({session, events, stallRequests}) => {
  return <Flex  direction="column" align="center">
    <Heading mt={10} as='h3' size='lg'>
    My Events
  </Heading>
  <Flex align="center" w="50%" direction="column" mt={8}>
    {events.events.map((event)=>{
      return <Event key={event._id} name={event.name} date={event.date} venue={event.venue} imageUrl={event.images[0]}/>
    })}
   
    
  </Flex>
  <Heading mt={10} as='h3' size='lg'>
    Stall Requests
  </Heading>
  <Flex mb={10} w="50%" direction="column" mt= {8}>
  {stallRequests.stalls.map((request)=>{
    const stallCategory = request.event.eventStalls.filter((stall)=>{ 
      return stall.stallId == request.stallId;})
      const userProfile = <VStack align="left">
        <Text>Business Name: {request.vendor.extendProfile.businessName}</Text>
        <Text>Store Number: {request.vendor.extendProfile.businessNumber}</Text>
        <Text>Store Address: {request.vendor.extendProfile.businessAddress}</Text>
        <Text>Store Bio: {request.vendor.extendProfile.businessDescription}</Text>
        </VStack>
    return <StallRequest key={request._id}
    vendorName={`${request.vendor.firstname} ${request.vendor.surname}`} 
    eventName={request.event.name}
    stallCategory={stallCategory[0].stallId}
    date={request.createdAt}
    userProfile={userProfile}
    />
  })}
  </Flex>
  </Flex>;
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
  } else{
    const eventsEndpoint = `${process.env.NEXTAUTH_URL}/api/v1/events?organizerId=${session.userId}`;
    const eventsResponse = await fetch(eventsEndpoint);
    events = await eventsResponse.json();

    const stallRequestEndpoint = `${process.env.NEXTAUTH_URL}/api/v1/stalls/?vendorId=${session.userId}`;
    const requestsResponse = await fetch(stallRequestEndpoint);
    stallRequests = await requestsResponse.json();
  }

  return {
    props: {
      events: events,
      session: session,
      stallRequests: stallRequests
    }, 
  }
}
