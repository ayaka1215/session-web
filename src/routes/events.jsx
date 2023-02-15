import { Link } from "react-router-dom";
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
} from "@chakra-ui/react";
import Common from "../components/layout/Common.jsx";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";

function Events() {
  const [events, setEvents] = useState();
  useEffect(() => {
    const f = async () => {
      const res = await axiosInstance.get("/events");
      setEvents(res.data);
    };
    f();
  }, []);

  return (
    <>
      <Common>
        <div style={{ margin: "auto", maxWidth: "1000px" }}>
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
                        {format(new Date(e.start_time), "HH:mm", {
                          locale: ja,
                        })}{" "}
                        -{" "}
                        {format(new Date(e.end_time), "HH:mm", { locale: ja })}
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
                      <Button variant="ghost" colorScheme="blue">
                        編集
                      </Button>
                      <Button variant="ghost" colorScheme="blue">
                        削除
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              );
            })}
          </SimpleGrid>
        </div>
      </Common>
    </>
  );
}

export default Events;
