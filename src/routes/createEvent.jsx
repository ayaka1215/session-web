import { useNavigate } from "react-router-dom";
import { useState, React } from "react";
import { axiosInstance } from "../utils/axios.js";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import HeaderNav from "../components/organisms/HeaderNav.jsx";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [place, setPlace] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const createFormData = () => {
    const formData = new FormData();
    if (!image) return;
    formData.append("event[title]", title);
    formData.append("event[content]", content);
    formData.append("event[date]", date);
    formData.append("event[start_time]", start_time);
    formData.append("event[end_time]", end_time);
    formData.append("event[place]", place);
    formData.append("event[image]", image);
    return formData;
  };

  const onClick = async () => {
    try {
      const data = createFormData();
      await axiosInstance.post("/events", data);
      navigate("/events", { replace: true });
      toast({
        title: "イベントを作成しました。",
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
    <>
      <HeaderNav />
      <div style={{ margin: "auto", maxWidth: "1000px" }}>
        <Heading as="h1" size="lg" noOfLines={1} mb="10" mt="5" ml="2">
          イベント新規作成
        </Heading>
        <VStack spacing={6} mx={2}>
          <FormControl isRequired>
            <FormLabel>イベントタイトル</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="イベントタイトルを入力してください。"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>内容</FormLabel>
            <Textarea
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="イベント内容を入力してください。"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>開催日</FormLabel>
            <Input
              maxWidth="200px"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>開始時刻</FormLabel>
            <Input
              maxWidth="200px"
              type="time"
              value={start_time}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>終了時刻</FormLabel>
            <Input
              maxWidth="200px"
              type="time"
              value={end_time}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>開催場所</FormLabel>
            <Input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="開催場所を入力してください。"
            />
          </FormControl>
          <FormControl>
            <FormLabel>画像</FormLabel>
            <Input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              border="none"
              padding="1"
            />
          </FormControl>
          <Button colorScheme="teal" onClick={onClick} width="300px" mt="5">
            作成する
          </Button>
        </VStack>
      </div>
    </>
  );
}

export default CreateEvent;
