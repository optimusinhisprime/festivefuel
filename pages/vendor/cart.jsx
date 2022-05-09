import React from 'react';
import { useCartContext } from '../../context/CartContext';
import styled from 'styled-components';
import { Link } from '@chakra-ui/react';

export default function ShoppingCart() {
  const { cart } = useCartContext();
  if (cart?.length < 1) {
    return (
      <Wrapper className='page-100'>
        <div className='empty'>
          <h2>Your cart is empty</h2>
        </div>
      </Wrapper>
    );
  }

  return <div>Shopping Cart Page</div>;
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;
