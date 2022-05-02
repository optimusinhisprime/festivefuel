import React from 'react'
import {partners} from "../../../partners"
import { Flex, Text, Image, Box} from '@chakra-ui/react'

export default function Partners() {

    const partnerList = partners.map((partner)=> {

        return(<Box mr={5} ml={5} border='2px' borderColor='gray.200' key={partner.name}>
            <Image src={partner.logo}/>
            <Text>{partner.name}</Text>
          </Box>)
        
      })
  return (
    <Flex>
      {partnerList}
    </Flex>
  )
}
