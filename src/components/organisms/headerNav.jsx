import { Link } from "react-router-dom";
import { Flex, Text, Box, Heading } from "@chakra-ui/react";

function HeaderNav() {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading size="md">
          <Link to="/events">Session App</Link>
        </Heading>
      </Box>
      <Text>マイページ</Text>
      <Text>予約一覧</Text>
      <Text>ログアウト</Text>
    </Flex>
  );
}

export default HeaderNav;
