import { useNavigate } from "react-router-dom";
import { useState, useEffect, React, useRef, useContext } from "react";
import {
  updateUser,
  getPartAll,
  getUserDetail,
} from "../lib/apiClient/user.js";
import { AuthContext } from "../App.js";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
  Center,
  Image,
  Checkbox,
  Stack,
  Text,
  Box,
  Flex,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Common from "../components/layout/Common.jsx";

function EditUser() {
  const { currentUser } = useContext(AuthContext);

  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [parts, setParts] = useState([]);
  const [partIds, setPartIds] = useState([0]);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const f = async () => {
      const resPart = await getPartAll();
      setParts(resPart.data);

      setUser(currentUser);
      setName(currentUser.name);
      setEmail(currentUser.email);
      setImage(currentUser.image);

      const res = await getUserDetail(currentUser.id);
      const tmpParts = res.data[0].parts;
      const tmpPartIds = [];
      {
        Object.values(tmpParts).map((tmpPart) => {
          tmpPartIds.push(tmpPart.id);
        });
      }
      setPartIds(tmpPartIds);
    };
    f();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (partIds.includes(Number(e.target.value))) {
      setPartIds(partIds.filter((partId) => partId !== Number(e.target.value)));
    } else {
      setPartIds([...partIds, Number(e.target.value)]);
    }
  };

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
      await updateUser(currentUser.id, data);
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
      <Box maxWidth="600px" margin="auto" p="5">
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
            <FormControl isRequired width="100%">
              <FormLabel>名前</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="名前を入力してください"
              />
            </FormControl>
            <FormControl>
              <FormLabel>担当パート</FormLabel>
              <Wrap spacing={5}>
                {parts.map((part) => {
                  return (
                    <WrapItem>
                      <Checkbox
                        size="sm"
                        colorScheme="green"
                        id={part.name}
                        value={part.id}
                        checked={partIds.includes(part.id)}
                        onChange={handleChange}
                      >
                        <Text>{part.name}</Text>
                      </Checkbox>
                    </WrapItem>
                  );
                })}
              </Wrap>
            </FormControl>
            <FormControl isRequired width="100%">
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
      </Box>
    </Common>
  );
}

export default EditUser;
