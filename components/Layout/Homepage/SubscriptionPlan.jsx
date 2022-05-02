import React from 'react'
import { VStack, Button, Text, Box, StackDivider} from '@chakra-ui/react'
export default function SubscriptionPlan({name, price}) {
  return (
    <Box m={10} border='2px' borderColor='gray.200' variant="ghost">
      <VStack
      divider={<StackDivider borderColor='gray.200' />}
      >
        <Text>{name}</Text>
        <Text>{price}</Text>
        <Button colorScheme="blackAlpha">Subscribe</Button>
      </VStack>
    </Box>
  )
}
