import React, { useEffect, useState } from 'react';
import { formatPrice } from '../../utils/formatPrice';
import { CloseIcon } from '@chakra-ui/icons';
import styled from 'styled-components';
import serverApi from '../../utils/serverApi';
import { useCartContext } from '../../context/CartContext';

const CartItem = ({ eventObj, stallId, vendor, event }) => {
  const { removeItem } = useCartContext();
  const [stallData, setStallData] = useState([]);
  const [myStalls, setMyStalls] = useState([]);
  const [currentStall, setCurrentStall] = useState({});
  const getStallData = async () => {
    const {
      data: { stalls },
    } = await serverApi.get(`/stalls?vendorId=${vendor}`);
    setStallData(stalls);

    const stall = stallData.find((stall) => stall.stallId === stallId);
    setCurrentStall(stall);

    const myStalls = eventObj.eventStalls.find(
      (stall) => stall.stallId === stallId
    );
    setMyStalls(myStalls);
    // console.log(myStalls);
    console.log(currentStall);

    // console.log(eventObj.eventStalls);
    // eventObj.map((event) => {
    //   console.log(event);
    // });
    // const singleStall = stallData.find((stall) => stall._id === stallId);
    // console.log(singleStall);

    // 2c6e2979-f97f-41eb-93e0-c6d7a018b1e2
    // e456b842-1115-4858-beb7-b3dec5a0b243
  };

  useEffect(() => {
    getStallData();
  }, []);
  return (
    <Wrapper>
      <div className='title'>
        <img src={eventObj.images[0]} alt={name} />
        <div>
          <h5 className='name'>{eventObj.eventName}</h5>
          <p className='badge'>Stall Type: {myStalls.category}</p>
          <h5 className='price-small'>
            {/* {formatPrice(parseInt(myStalls.price.split('').shift().join('')))} */}
            {formatPrice(10000)}
          </h5>
        </div>
      </div>
      <h5 className='price'>{formatPrice(1000)}</h5>
      <h5 className='subtotal'>{currentStall?.requestStatus}</h5>
      <button
        className='remove-btn'
        onClick={() => removeItem(vendor + event + stallId)}
      >
        <CloseIcon />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .subtotal {
    display: none;
  }
  .price {
    display: none;
  }
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .title {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }

  .badge {
    color: var(--clr-grey-5);
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: var(--radius);
    }
  }
  .price-small {
    color: var(--clr-primary-5);
  }
  .amount-btns {
    width: 75px;
    button {
      width: 1rem;
      height: 0.5rem;
      font-size: 0.75rem;
    }
    h2 {
      font-size: 1rem;
    }
  }
  .remove-btn {
    color: var(--clr-red-dark);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }
  @media (min-width: 776px) {
    .subtotal {
      display: block;
      margin-bottom: 0;
      color: var(--clr-grey-5);
      font-weight: 400;
      font-size: 1rem;
    }
    .price-small {
      display: none;
    }
    .price {
      display: block;
      font-size: 1rem;
      color: var(--clr-primary-5);
      font-weight: 400;
    }
    .name {
      font-size: 0.85rem;
    }
    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;
    img {
      height: 100%;
    }
    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
    .amount-btns {
      width: 100px;
      button {
        width: 1.5rem;
        height: 1rem;
        font-size: 1rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
  }
`;

export default CartItem;
