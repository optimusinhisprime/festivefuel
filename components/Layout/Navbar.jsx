import React, { useEffect, useState } from 'react';

import {
  Flex,
  Box,
  Link,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { GrLogin, GrFormDown } from 'react-icons/gr';
import { useCartContext } from '../../context/CartContext';

export default function Navbar({ children }) {
  const { total_items } = useCartContext();
  return (
    <Flex
      direction={['column', 'row']}
      bg='#000E44'
      pr={7}
      pl={7}
      align='center'
      justify='space-between'
    >
      <Box>
        <Image w={['100%', 200]} src='/festivalfuel-logo.png' />
      </Box>

      <Flex mt={[10, 0, 0, 0]} mb={[5, 0, 0, 0]}>
        <Menu>
          <MenuButton size='sm' as={Button} rightIcon={<GrFormDown />}>
            Profile
          </MenuButton>
          <MenuList>
            <MenuItem>Stall Requests</MenuItem>

            <MenuItem>Shopping Cart: {total_items} items</MenuItem>

            <MenuItem>Account Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>

        <Button size='sm' ml={3} leftIcon={<GrLogin />} variant='solid'>
          Sign In
        </Button>
      </Flex>
    </Flex>
  );
}
