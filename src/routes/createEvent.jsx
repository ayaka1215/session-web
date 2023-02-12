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
} from "@chakra-ui/react";
import HeaderNav from "../components/organisms/HeaderNav.jsx";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [place, setPlace] = useState("");
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      await axiosInstance.post("/events", {
        title,
        content,
        date,
        startTime,
        endTime,
        place,
      });
      navigate("/events", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <HeaderNav />
      <div style={{ margin: "auto", maxWidth: "1000px" }}>
        <Heading as="h1" size="lg" noOfLines={1} mb="10" mt="5" ml="2">
          イベント新規
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
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>終了時刻</FormLabel>
            <Input
              maxWidth="200px"
              type="time"
              value={endTime}
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

          <Button colorScheme="teal" onClick={onClick} width="300px" mt="5">
            作成する
          </Button>
        </VStack>
      </div>
    </>
  );
}

export default CreateEvent;
