import React from 'react'
import { Link ,Flex, Text, VStack, StackDivider, Image} from '@chakra-ui/react'

const Event = ({event}) => {
  const { name, date, venue, images } = event;
  return (
    <Flex direction={["column","column","row","row"]} mt={2} mb={2} p={2} border='2px' borderColor='gray.400' w="100%" cursor="pointer" >
      <Image w={["100%", "100%", "50%",  "30%"]} h="auto" src={images[0]}/>
      <VStack p={5} w="100%" divider={<StackDivider borderColor='gray.400' />}>
        <Text>{name}</Text>
        <Text>{date}</Text>
        <Text>{venue}</Text>
        <Link color='orange'>View More Information</Link>
      </VStack>
    </Flex>
  )
}

export default Event
