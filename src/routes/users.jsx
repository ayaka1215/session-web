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
                    <Th>Email</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users?.map((e) => {
                    return (
                      <Tr>
                        <Td>{e.id}</Td>
                        <Td>{e.name}</Td>
                        <Td>{e.email}</Td>
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
