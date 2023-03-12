import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, React } from "react";
import { axiosInstance } from "../utils/axios.js";
import {
  getUserDetail,
  updateUser,
  getPartAll,
} from "../lib/apiClient/user.js";
import { getCurrentUser } from "../lib/apiClient/auth.js";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
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
  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams();

  useEffect(() => {
    const f = async () => {
      const resUser = await getCurrentUser();
      const currentUserId = resUser.data.data.id;

      const res = await getUserDetail(currentUserId);
      setUser(res.data);
      setName(res.data.name);
      setEmail(res.data.email);
      setImage(res.data.image);

      const resPart = await getPartAll();
      setParts(resPart.data);
    };
    f();
  }, []);

  const createFormData = () => {
    const formData = new FormData();
    formData.append("user[name]", name);
    formData.append("user[email]", email);
    if (image) {
      formData.append("user[image]", image);
    }
    return formData;
  };

  const onClick = async () => {
    try {
      const data = createFormData();
      const resUser = await getCurrentUser();
      const currentUserId = resUser.data.data.id;
      await updateUser(currentUserId, data);

      navigate("/mypage", { replace: true });
      toast({
        title: "ユーザー情報を更新しました。",
        description: "",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "エラーが発生しました。",
        description: "入力内容を確認してください。",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Common>
      <Heading as="h1" size="lg" noOfLines={1} ml="2">
        マイページ
      </Heading>
      {user && (
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
          <FormControl isRequired maxWidth="300px">
            <FormLabel>名前</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="名前を入力してください"
            />
          </FormControl>
          <FormControl>
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
          <FormControl isRequired maxWidth="300px">
            <FormLabel>メールアドレス</FormLabel>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="メールアドレスを入力してください"
            />
          </FormControl>
        </VStack>
      )}
      <Center my="10">
        <Button colorScheme="teal" onClick={onClick} width="300px">
          更新する
        </Button>
      </Center>
    </Common>
  );
}

export default EditUser;