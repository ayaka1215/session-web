import { useState, useEffect, React } from "react";
import { getUserAll, deleteUser } from "../lib/apiClient/user.js";
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
  useToast,
} from "@chakra-ui/react";
import Common from "../components/layout/Common.jsx";

function Users() {
  const [users, setUsers] = useState();
  const toast = useToast();

  useEffect(() => {
    const f = async () => {
      const res = await getUserAll();
      setUsers(res.data);
    };
    f();
  }, []);

  const destroyUser = async (id) => {
    const isOk = window.confirm("ユーザーを削除します。よろしいですか？");
    if (isOk) {
      try {
        await deleteUser(id);
        setUsers(users.filter((users) => users.id !== id));
        toast({
          title: "ユーザーを削除しました。",
          description: "",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (e) {
        console.log(e);
        toast({
          title: "エラーが発生しました。",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

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
                    <Th>許可</Th>
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
                        <Td>{e.is_admin ? "管理" : "メンバー"}</Td>
                        <Td>{e.is_permitted ? "済" : <Button>許可</Button>}</Td>
                        <Td>
                          <Button>詳細</Button>
                        </Td>
                        <Td>
                          <Button onClick={() => destroyUser(e.id)}>
                            削除
                          </Button>
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
