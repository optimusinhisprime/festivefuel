import { Button } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../../context/CartContext';
import CartColumns from './CartColumns';
// import { Link } from '@chakra-ui/react';
import CartItem from './CartItem';
import CartTotal from './CartTotal';
// import CartTotals from './CartTotals';
const CartContent = () => {
  const { cart, clearCart } = useCartContext();

  return (
    <Wrapper className='section section-center'>
      <CartColumns />
      {cart?.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <hr />
      <div className='link-container'>
        <Button
          onClick={clearCart}
          type='button'
          className='link-btn clear-btn'
        >
          clear shopping cart
        </Button>
      </div>
      <CartTotal />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;
export default CartContent;
