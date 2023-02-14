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
        <div style={{ margin: "auto", maxWidth: "1000px" }}>
          <Flex mb="5" mt="5">
            <Heading as="h1" size="lg" noOfLines={1} ml="5">
              イベント詳細
            </Heading>
            <Spacer />
            <Button variant="ghost" colorScheme="blue">
              編集
            </Button>
            <Button variant="ghost" colorScheme="blue">
              削除
            </Button>
          </Flex>
          <SimpleGrid columns={[1, null, 3]} spacingX="40px" spacingY="20px">
            <Card maxW="sm">
              <CardBody>
                {event.image?.url ? (
                  <Image
                    src={event.image.url}
                    alt={event.title}
                    borderRadius="lg"
                    width="100%"
                    maxHeight="156px"
                  />
                ) : (
                  <Image
                    src={`${process.env.PUBLIC_URL}/event_no_image.png`}
                    alt={event.title}
                    borderRadius="lg"
                  />
                )}
                <Stack mt="6" spacing="2">
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
                  <Text>{event.content}</Text>
                </Stack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </div>
      </Common>
    </>
  );
}

export default Event;
