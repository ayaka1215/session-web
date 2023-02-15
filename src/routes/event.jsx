import { Link, useParams } from "react-router-dom";
import { useState, useEffect, React } from "react";
import { axiosInstance } from "../utils/axios.js";
import {
  Heading,
  Text,
  Image,
  Stack,
  ButtonGroup,
  Button,
  Flex,
  Spacer,
  Center,
  Box,
} from "@chakra-ui/react";
import Common from "../components/layout/Common.jsx";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";

function Event() {
  const [event, setEvent] = useState();
  const params = useParams();

  useEffect(() => {
    const f = async () => {
      const res = await axiosInstance.get(`/events/${params.id}`);
      setEvent(res.data);
    };
    f();
  }, []);

  return (
    <>
      <Common>
        <div style={{ margin: "auto", maxWidth: "650px", padding: "5px" }}>
          <Flex my="5">
            <Spacer />
            <ButtonGroup>
              <Button variant="ghost" colorScheme="teal">
                編集
              </Button>
              <Button variant="ghost" colorScheme="teal">
                削除
              </Button>
            </ButtonGroup>
          </Flex>
          {event && (
            <>
              {event.image?.url ? (
                <Image
                  src={event.image.url}
                  alt={event.title}
                  borderRadius="lg"
                  Width="100%"
                  Height="100%"
                />
              ) : (
                <Image
                  src={`${process.env.PUBLIC_URL}/event_no_image.png`}
                  alt={event.title}
                  borderRadius="lg"
                  Width="100%"
                />
              )}
              <Stack mt="6" mx="4" spacing="2">
                <Heading size="md">{event.title}</Heading>
                <Text>
                  {format(new Date(event.date), "yyyy年M月d日", {
                    locale: ja,
                  })}{" "}
                  {format(new Date(event.start_time), "HH:mm", {
                    locale: ja,
                  })}{" "}
                  -{" "}
                  {format(new Date(event.end_time), "HH:mm", {
                    locale: ja,
                  })}
                </Text>
                <Text>@{event.place}</Text>
              </Stack>
              <Box
                mt="6"
                p="6"
                rounded="md"
                bg={"gray.100"}
                border="1px"
                borderColor="gray.100"
              >
                <Text fontWeight="bold">イベント概要</Text>
                <Text mt="5" whiteSpace="pre-line">
                  {event.content}
                </Text>
              </Box>
              <Center my="10">
                <Button colorScheme="teal" width="300px">
                  このイベントを予約する
                </Button>
              </Center>
            </>
          )}
        </div>
      </Common>
    </>
  );
}

export default Event;
