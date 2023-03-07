import { Link } from "react-router-dom";
import { useState, useEffect, React } from "react";
import { getEventAll, deleteEvent } from "../lib/apiClient/event.js";
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
  useToast,
} from "@chakra-ui/react";
import Common from "../components/layout/Common.jsx";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";

function Events() {
  const [events, setEvents] = useState();
  const toast = useToast();

  useEffect(() => {
    const f = async () => {
      const res = await getEventAll();
      setEvents(res.data);
    };
    f();
  }, []);

  const destroyEvent = async (id) => {
    const isOk = window.confirm("イベントを削除します。よろしいですか？");
    if (isOk) {
      try {
        await deleteEvent(id);
        setEvents(events.filter((event) => event.id !== id));
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
        <Flex mb="5" mt="5">
          <Heading as="h1" size="lg" noOfLines={1} ml="5">
            イベント一覧
          </Heading>
          <Spacer />
          <Button colorScheme="teal" mr="5">
            <Link to="/events/create">新規作成</Link>
          </Button>
        </Flex>
        <SimpleGrid columns={[1, null, 3]} spacingX="40px" spacingY="20px">
          {events?.map((e) => {
            return (
              <Card maxW="sm">
                <CardBody>
                  {e.image?.url ? (
                    <Image
                      src={e.image.url}
                      alt={e.title}
                      borderRadius="lg"
                      width="100%"
                      maxHeight="156px"
                    />
                  ) : (
                    <Image
                      src={`${process.env.PUBLIC_URL}/event_no_image.png`}
                      alt={e.title}
                      borderRadius="lg"
                    />
                  )}
                  <Stack mt="6" spacing="2">
                    <Heading size="md">{e.title}</Heading>
                    <Text>
                      {format(new Date(e.date), "yyyy年M月d日", {
                        locale: ja,
                      })}{" "}
                      {e.start_time} - {e.end_time}
                    </Text>
                    <Text>@{e.place}</Text>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Link to={`/events/${e.id}`} key={e.id}>
                      <Button variant="solid" colorScheme="blue">
                        詳細
                      </Button>
                    </Link>
                    <Link to={`/events/${e.id}/edit`} key={e.id}>
                      <Button variant="ghost" colorScheme="blue">
                        編集
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() => destroyEvent(e.id)}
                    >
                      削除
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          })}
        </SimpleGrid>
      </Common>
    </>
  );
}

export default Events;
