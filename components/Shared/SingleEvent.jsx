import React from 'react';
import styled from 'styled-components';
import { Flex, Image, Box, Heading, Button } from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import EventImages from './EventImages';
import EventInfo from './EventInfo';

const SingleEvent = ({ event }) => {
  if (event)
    return (
      <Wrapper>
        <div className='section section-center page'>
          <div className='event-center'>
            <EventImages images={event.images} />
            <EventInfo event={event} />
          </div>
        </div>
      </Wrapper>
    );
};

const Wrapper = styled.main`
  width: 100%;
  .section {
    padding: 2rem 0;
  }
  .section-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }

  @media screen and (min-width: 768px) {
    .section-center {
      width: 95vw;
    }
  }

  .page-100 {
    min-height: calc(100vh - 10rem);
    padding: 2rem 0;
  }
  .page {
    min-height: 100vh;
  }

  .event-center {
    display: grid;
    gap: 4em;
    /* /margin-top: 1rem; */
  }
  @media (min-width: 768px) {
    .event-center {
      grid-template-columns: 1fr 1fr;
      align-content: center;
    }
  }
`;

export default SingleEvent;
