import { Flex, Text, Box, Heading } from '@chakra-ui/react'

function headerNav () {
    return(
        <Flex minWidth='max-content' alignItems='center' gap='2'>
        <Box p='2'>
            <Heading size='md'>Session App</Heading>
        </Box>
        <Text></Text>
        </Flex>
    );

}

export default headerNav;