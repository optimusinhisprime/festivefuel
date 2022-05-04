import React from 'react'
import { Flex, Image, Box, Heading, Button } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'
const SingleEvent = () => {
  return (
    <Flex mt={10}  align="center" direction="column"> 
    <Flex direction={["column", "row"]}>
        <Image w={400} src="https://umfworldwide.com/wp-content/uploads/2017/11/resistance-abu-dhabi-lineup.jpg"/>
        <Box>
            <p>Date: </p>
            <p>Time:</p>
            <p>Anticipated Event Attendance:</p>
            <p>Venue:</p>
            <p>Description:</p>
        </Box>
    </Flex>
    <Heading mt={8} size='lg'>Event Stalls</Heading>
    <Flex mb={10} w="60%" mt={10} direction="column">
    <TableContainer>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>Type</Th>
        <Th>Price</Th>
        <Th isNumeric>Available</Th>
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Food Stall</Td>
        <Td>P500.00</Td>
        <Td isNumeric>10</Td>
        <Td><Button>Request Stall</Button></Td>
      </Tr>
      <Tr>
        <Td>Food Stall</Td>
        <Td>P500.00</Td>
        <Td isNumeric>10</Td>
        <Td><Button>Request Stall</Button></Td>
      </Tr>
    </Tbody>
    
  </Table>
</TableContainer>
    </Flex>
    </Flex>
  )
}

export default SingleEvent