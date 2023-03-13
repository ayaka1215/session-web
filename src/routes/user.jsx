import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, React } from "react";
import {
  getUserDetail,
  deleteUser,
  getPartAll,
} from "../lib/apiClient/user.js";
import { getCurrentUser } from "../lib/apiClient/auth.js";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  ButtonGroup,
  Button,
  VStack,
  useToast,
  Spacer,
  Flex,
  Center,
  Image,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
import Common from "../components/layout/Common.jsx";

function EditUser() {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [parts, setParts] = useState([]);
  const params = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const f = async () => {
      const res = await getUserDetail(params.id);
      setUser(res.data);
      setName(res.data.name);
      setEmail(res.data.email);
      setImage(res.data.image);

      const resPart = await getPartAll();
      setParts(resPart.data);
    };
    f();
  }, []);

  const destroyUser = async (id) => {
    const isOk = window.confirm("ユーザーを削除します。よろしいですか？");
    if (isOk) {
      try {
        await deleteUser(id);
        navigate("/users", { replace: true });
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
    <Common>
      {user && (
        <Box maxWidth="650px" margin="auto">
          <Flex my="5">
            <Spacer />
            <ButtonGroup>
              <Link to="/users">
                <Button variant="ghost" colorScheme="teal">
                  一覧
                </Button>
              </Link>
              <Button
                variant="ghost"
                colorScheme="teal"
                onClick={() => destroyUser(user.id)}
              >
                削除
              </Button>
            </ButtonGroup>
          </Flex>
          <VStack spacing={6} mx={2}>
            {image?.url ? (
              <Image
                src={image.url}
                alt="image"
                borderRadius="lg"
                width="300px"
              />
            ) : (
              <Image
                src={`${process.env.PUBLIC_URL}/user_no_image.png`}
                alt="no image"
                borderRadius="lg"
                width="300px"
              />
            )}
            <FormControl maxWidth="300px">
              <FormLabel>プロフィール画像</FormLabel>
              <Input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                border="none"
                padding="1"
              />
            </FormControl>
            <FormControl isRequired maxWidth="300px" as="fieldset" disabled>
              <FormLabel>名前</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="名前を入力してください"
              />
            </FormControl>
            <FormControl as="fieldset" disabled>
              <CheckboxGroup colorScheme="green">
                <Stack spacing={[1, 5]} direction={["column", "row"]}>
                  {parts.map((part) => {
                    return (
                      <Checkbox
                        value={part.id}
                        onchange={(e) => setParts(e.target.value)}
                      >
                        {part.name}
                      </Checkbox>
                    );
                  })}
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <FormControl isRequired maxWidth="300px" as="fieldset" disabled>
              <FormLabel>メールアドレス</FormLabel>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="メールアドレスを入力してください"
              />
            </FormControl>
          </VStack>
        </Box>
      )}
    </Common>
  );
}

export default EditUser;
