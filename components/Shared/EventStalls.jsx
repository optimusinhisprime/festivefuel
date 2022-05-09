import React from 'react';
import { Button, Divider, Text } from '@chakra-ui/react';
import { useCartContext } from '../../context/CartContext';
const EventStalls = ({ stall, requestStall }) => {
  return (
    <>
      <Text>Category: {stall.category}</Text>
      <Text>Stalls Available: {stall.available}</Text>
      <Text>Price Per Stall: {stall.price}</Text>
      <Button onClick={() => requestStall(stall.stallId)}>Request Stall</Button>
      <Divider />
    </>
  );
};

export default EventStalls;
