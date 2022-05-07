import { Badge, Text, Box, Flex, Divider } from '@chakra-ui/react';
import React from 'react';

const StallRequest = ({ stall }) => {
  const { requestStatus, event, createdAt } = stall;
  return <Text>Stall Request</Text>;
};

export default StallRequest;
