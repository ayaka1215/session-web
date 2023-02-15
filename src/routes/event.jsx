import { Link, useParams } from "react-router-dom";
import { useState, useEffect, React } from "react";
import { axiosInstance } from "../utils/axios.js";
import {
  Card,
  Heading,
  Text,
  Image,
  Stack,
  CardBody,
  ButtonGroup,
  Button,
  CardFooter,
  SimpleGrid,
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
          <Flex mb="5" mt="5">
            <Spacer />
            <Button variant="ghost" colorScheme="blue">
              編集
            </Button>
            <Button variant="ghost" colorScheme="blue">
              削除
            </Button>
          </Flex>
          {event && (
            <>
              {event.image?.url ? (
                <Image
                  src={event.image.url}
                  alt={event.title}
                  borderRadius="lg"
                  maxWidth="100%"
                  maxHeight="156px"
                />
              ) : (
                <Image
                  src={`${process.env.PUBLIC_URL}/event_no_image.png`}
                  alt={event.title}
                  borderRadius="lg"
                  maxWidth="100%"
                />
              )}
              <Stack mt="6" mx="2" spacing="2">
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
                bg={"gray.100"}
                rounded="md"
                p="5"
                border="1px"
                borderColor="gray.100"
              >
                <Text fontWeight="bold">イベント概要</Text>
                <Text mt="5">{event.content}</Text>
              </Box>
              <Center>
                <Button colorScheme="teal" width="300px" my="10">
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
