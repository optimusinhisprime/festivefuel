import React, { useEffect, useState } from 'react';
import { Badge, Flex, Box, Text, Divider, HStack } from '@chakra-ui/react';
import serverApi from '../../utils/serverApi';
import styled from 'styled-components';
import StallRequest from '../../components/Shared/StallRequest';

const VendorProfilePage = () => {
  const [profile, setProfile] = useState();
  const [stallRequests, setStallRequests] = useState();

  const getProfile = async () => {
    const {
      data: { user },
    } = await serverApi.get('users/62730c958d3dada712ae63a0');
    const {
      data: { stalls },
    } = await serverApi.get('stalls/?vendorId=62730c958d3dada712ae63a0');

    setProfile(user);
    setStallRequests(stalls);
    console.log(stalls);
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (profile)
    return (
      <Wrapper>
        <div className='section section-center'>
          <Flex>
            <Box ml='3'>
              <Text fontWeight='bold' fontSize='lg'>
                {profile.firstname} {profile.surname}
                <Badge ml='1' colorScheme='green'>
                  {profile.role}
                </Badge>
              </Text>
              <Text fontSize='md'>{profile.extendProfile.businessName}</Text>
              <Divider />
              <Text fontSize='sm'>Email: {profile.email}</Text>
              <Text fontSize='sm'>Number: {profile.phoneNumber}</Text>
            </Box>
          </Flex>
          {stallRequests && (
            <HStack>
              {stallRequests.map((stall) => (
                <StallRequest key={stall._id} stall={stall} />
              ))}
            </HStack>
          )}
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
`;

export default VendorProfilePage;
