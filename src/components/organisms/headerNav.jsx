import { Flex, Text, Box, Heading } from "@chakra-ui/react";

function HeaderNav() {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading size="md">Session App</Heading>
      </Box>
      <Text>マイページ</Text>
      <Text>予約一覧</Text>
      <Text>ログアウト</Text>
    </Flex>
  );
}

export default HeaderNav;
