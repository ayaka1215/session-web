import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, React, useContext } from "react";
import { getEventDetail, deleteEvent } from "../lib/apiClient/event.js";
import { AuthContext } from "../App.js";
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
  useToast,
} from "@chakra-ui/react";
import Common from "../components/layout/Common.jsx";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";

function Event() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [event, setEvent] = useState();
  const params = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const f = async () => {
      const res = await getEventDetail(params.id);
      setEvent(res.data);
    };
    f();
  }, []);

  const destroyEvent = async (id) => {
    const is_ok = window.confirm("イベントを削除します。よろしいですか？");
    if (is_ok) {
      try {
        await deleteEvent(id);
        navigate("/events", { replace: true });
        toast({
          title: "イベントを削除しました。",
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
        {event && (
          <Box maxWidth="650px" margin="auto">
            <Flex my="5">
              <Spacer />
              {currentUser.is_admin && (
                <ButtonGroup>
                  <Link to={`/events/${event.id}/edit`}>
                    <Button variant="ghost" colorScheme="teal">
                      編集
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    onClick={() => destroyEvent(event.id)}
                  >
                    削除
                  </Button>
                </ButtonGroup>
              )}
            </Flex>

            <>
              {event.image?.url ? (
                <Image
                  src={event.image.url}
                  alt={event.title}
                  borderRadius="lg"
                  Width="100%"
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
                  {event.start_time}-{event.end_time}
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
                {console.log(currentUser.is_permitted)}
                {!currentUser.is_admin && (
                  <Button colorScheme="teal" width="300px">
                    このイベントを予約する
                  </Button>
                )}
              </Center>
            </>
          </Box>
        )}
      </Common>
    </>
  );
}

export default Event;
