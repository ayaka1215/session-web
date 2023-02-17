import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, React } from "react";
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
  Spacer,
  Flex,
  Center,
} from "@chakra-ui/react";
import Common from "../components/layout/Common.jsx";
import { format } from "date-fns";

function EditEvent() {
  const [event, setEvent] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [place, setPlace] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams();

  useEffect(() => {
    const f = async () => {
      const res = await axiosInstance.get(`/events/${params.id}`);
      setEvent(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);
      setDate(res.data.date);
      setStartTime(res.data.start_time);
      setEndTime(res.data.end_time);
      setPlace(res.data.place);
    };
    f();
  }, []);

  const createFormData = () => {
    const formData = new FormData();
    formData.append("event[title]", title);
    formData.append("event[content]", content);
    formData.append("event[date]", date);
    formData.append("event[start_time]", start_time);
    formData.append("event[end_time]", end_time);
    formData.append("event[place]", place);
    if (image) {
      formData.append("event[image]", image);
    }
    return formData;
  };

  const onClick = async () => {
    try {
      const data = createFormData();
      await axiosInstance.put(`events/${params.id}`, data);
      navigate("/events", { replace: true });
      toast({
        title: "イベントを更新しました。",
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
      <div style={{ margin: "auto", maxWidth: "1000px" }}>
        <Flex mb="10" mt="5">
          <Heading as="h1" size="lg" noOfLines={1} ml="2">
            イベント編集
          </Heading>
          <Spacer />
          <Button variant="ghost" colorScheme="teal" mr="5">
            <Link to="/events">一覧へ戻る</Link>
          </Button>
        </Flex>
        {event && (
          <VStack spacing={6} mx={2}>
            <FormControl isRequired>
              <FormLabel>タイトル</FormLabel>
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
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
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
                value={image}
                onChange={(e) => setImage(e.target.files[0])}
                border="none"
                padding="1"
              />
            </FormControl>
          </VStack>
        )}
        <Center my="10">
          <Button colorScheme="teal" onClick={onClick} width="300px">
            更新する
          </Button>
        </Center>
      </div>
    </Common>
  );
}

export default EditEvent;
