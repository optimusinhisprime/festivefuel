import { Badge, Text, Box, Flex, Divider } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';

const StallRequest = ({ stall }) => {
  const { requestStatus, event, createdAt, expirationDate } = stall;
  return (
    <Box p={2} borderRadius='sm'>
      <Text>Event: {event?.name}</Text>
      <Text>Request ID: {stall._id}</Text>
      <Text>
        Date Created: {moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}
      </Text>
      Expires in:
      {requestStatus === 'pending' && (
        <Text>{moment().endOf(expirationDate).fromNow()}</Text>
      )}
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
