import Head from "next/head";
import { Flex, Text, Image, Center, Heading, Box } from '@chakra-ui/react'
import Partners from "../components/Layout/Homepage/Partners";
import SubscriptionPlan from "../components/Layout/Homepage/SubscriptionPlan";
export default function Home({session, carouselImages, reviews, pastEvents }) {
  return (
    <div>
      <Head>
        <title>Festival Fuel</title>
        <meta
          name="description"
          content="An event and vendor store management service for the local enterntainment industry."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" >
        <Flex mt={10} justify="center" height={400} bgImage="url('/market.jpg')" bgPosition="center" bgRepeat="no-repeat">
          <Center><Text fontSize='6xl' color="whitesmoke">Hello World</Text></Center>
          
        </Flex>

        <Flex direction='column' 
        pl={20} pr={20} align='center' mb={15}>
          <Heading mt={10} mb={25}>Our Partners</Heading>
        <Box mt={10}>
          <Partners />
        </Box >
          
          <Flex mt={20} direction="column" justify="center" align="center">
          <Heading mb={10}>Subscription Plans</Heading>
          <Flex>
            <SubscriptionPlan name="Monthly" price="P50"/>
            <SubscriptionPlan name="Semi-Annual" price="P250"/>
            <SubscriptionPlan name="Annual" price="P500"/>
          </Flex>

          </Flex>
          
        </Flex>



      </Flex>
    </div>
  );
}

export async function getServerSideProps(context) {
//get carousel images, customer reviews and old events from database
  return {
    props: {}, // will be passed to the page component as props
  }
}
