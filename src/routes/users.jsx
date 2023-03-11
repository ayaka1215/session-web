import { useState, useEffect, React } from "react";
import { getUserAll } from "../lib/apiClient/user.js";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Button,
} from "@chakra-ui/react";
import Common from "../components/layout/Common.jsx";

function Users() {
  const [users, setUsers] = useState();

  useEffect(() => {
    const f = async () => {
      const res = await getUserAll();
      setUsers(res.data);
    };
    f();
  }, []);

  return (
    <>
      <Common>
        {users && (
          <>
            <Heading as="h1" size="lg" noOfLines={1} ml="5">
              メンバー一覧
            </Heading>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>名前</Th>
                    <Th>パート</Th>
                    <Th>区分</Th>
                    <Th></Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users?.map((e) => {
                    return (
                      <Tr>
                        <Td>{e.id}</Td>
                        <Td>{e.name}</Td>
                        <Td>Guitar</Td>
                        <Td>メンバー</Td>
                        <Td>
                          <Button>詳細</Button>
                        </Td>
                        <Td>
                          <Button>削除</Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        )}
      </Common>
    </>
  );
}

export default Users;
