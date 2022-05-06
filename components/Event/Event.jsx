import React from 'react'
import { Flex, Box, HStack, StackDivider} from '@chakra-ui/react'

const Event = () => {
  return (
    <Flex p={2} border='2px' borderColor='gray.400' w="100%" cursor="pointer" justify="space-between">
      <Box>
          event name
      </Box>
      <HStack spacing={4} divider={<StackDivider borderColor='gray.400' />}>
          <Box >event date</Box>
          <Box mr={5}>event venue</Box>
      </HStack>
    </Flex>
  )
}

export default Event
