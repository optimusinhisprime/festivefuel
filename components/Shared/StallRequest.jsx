import { Badge, Text, Box, Flex, Divider } from '@chakra-ui/react';
import React from 'react';

const StallRequest = ({ stall }) => {
  const { requestStatus, event, createdAt } = stall;
  return (
    <Box p={2} borderRadius='sm'>
      <Text>Request ID: {stall._id}</Text>
      <Text>Date Created: {createdAt}</Text>
      <Flex>
        <Box>
          <Text fontWeight='bold' fontSize='lg'>
            Status:
          </Text>
          <Badge
            ml='1'
            colorScheme={
              requestStatus === 'pending'
                ? 'gray'
                : requestStatus === 'approved'
                ? 'green'
                : 'red'
            }
          >
            {requestStatus}
          </Badge>
        </Box>
      </Flex>
      <Divider />
    </Box>
  );
};

export default StallRequest;
