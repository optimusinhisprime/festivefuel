import React from 'react'
import { Flex, Box, Spacer, Image } from '@chakra-ui/react'

export default function Menu({children}) {
  return (
    <Flex bg="#000E44" pr={7} pl={7}  align="center" justify="space-between">
        <Box>
            <Image w={200} src="/festivalfuel-logo.png"/>
        </Box>

        <Flex color="whitesmoke">Nav Links</Flex>
      
    </Flex>
  )
}
