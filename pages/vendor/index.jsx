import { Flex, Image, Box, Text, Link } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { eventList } from '../../events';
import ReactPaginate from 'react-paginate';
import { useAppContext } from '../../context/appContext';

const VendorHomepage = () => {
  const { events } = useAppContext();
  return (
    <Flex direction='column'>
      <Box>
        <Carousel showThumbs={false}>
          <Box>
            <Image src='https://scontent.fgbe1-1.fna.fbcdn.net/v/t39.30808-6/217552954_4081151411953507_4736424485762953141_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=aJB_gyyBCYYAX9FRALt&_nc_ht=scontent.fgbe1-1.fna&oh=00_AT8wfZUqplgRM13_pDEyE1Xxi8EXX9Jhp1X6lhT6yGfN1g&oe=6275DDF8' />
            <Text className='legend'>
              Ultra Music Festival South Africa 2022
            </Text>
          </Box>

          <Box>
            <Image
              objectFit='cover'
              src='https://umfworldwide.com/wp-content/uploads/2020/02/south-africa-lineup-final-news-thumb-2020.jpg'
            />

            <Text className='legend'>
              Ultra Music Festival South Africa 2022
            </Text>
          </Box>
        </Carousel>
      </Box>

      <Flex mt={10} mb={10} direction='column' align='center'>
        <Box mb={10}>Filter</Box>
        <Flex
          m={10}
          justify='center'
          border='1px'
          borderColor='black.200'
          wrap='wrap'
        >
          {events.map((event) => {
            return (
              <Link
                href={`vendor/events/${event._id}`}
                key={event._id}
                _hover={{ textDecoration: 'none' }}
              >
                <Flex p={2} border='1px' borderColor='gray.200' w={400} m={5}>
                  <Image w={100} src={event.logo} />
                  <Flex ml={3} direction='column'>
                    <Text mb={3} fontSize='lg'>
                      {event.name}
                    </Text>
                    <Text>{event.date}</Text>
                  </Flex>
                </Flex>
              </Link>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VendorHomepage;
