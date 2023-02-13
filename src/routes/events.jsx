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
} from "@chakra-ui/react";
import HeaderNav from "../components/organisms/HeaderNav.jsx";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";

function Events() {
  const [Events, setEvents] = useState();
  useEffect(() => {
    const f = async () => {
      const res = await axiosInstance.get("/events");
      setEvents(res.data);
    };
    f();
  }, []);

  return (
    <>
      <HeaderNav />
      <div style={{ margin: "auto", maxWidth: "1000px" }}>
        <Heading as="h1" size="lg" noOfLines={1} mb="5" mt="5" ml="2">
          イベント一覧
        </Heading>
        <SimpleGrid columns={[1, null, 3]} spacingX="40px" spacingY="20px">
          {Events?.map((e) => {
            return (
              <Card maxW="sm">
                <CardBody>
                  {e.image?.url ? (
                    <Image
                      src={e.image.url}
                      alt={e.title}
                      borderRadius="lg"
                      width="100%"
                      maxHeight="178px"
                    />
                  ) : (
                    <Image
                      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt={e.title}
                      borderRadius="lg"
                    />
                  )}
                  <Stack mt="6" spacing="2">
                    <Heading size="md">{e.title}</Heading>
                    <Text>
                      {format(new Date(e.date), "yyyy年M月d日", { locale: ja })}{" "}
                      {format(new Date(e.start_time), "HH:mm", { locale: ja })}{" "}
                      - {format(new Date(e.end_time), "HH:mm", { locale: ja })}
                    </Text>
                    <Text>@{e.place}</Text>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button variant="solid" colorScheme="blue">
                      詳細
                    </Button>
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
    </>
  );
}

export default Events;
