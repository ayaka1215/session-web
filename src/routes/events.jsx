import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axios.js";
import { Card, Heading, Text, Image, Stack, CardBody, ButtonGroup, Button, CardFooter, SimpleGrid } from '@chakra-ui/react'
import HeaderNav from "../components/organisms/headerNav.jsx"

function Events() {
    const [Events, setEvents] = useState();
    useEffect(() => {
      const f = async () => {
        const res = await axiosInstance.get("/events");
        setEvents(res.data);
      };
    f();
   }, []);

    const handleToDate = str => {
        const d = new Date(str);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        const p = d.toJSON().match(/\d+/g);
        return `${p[0]}/${+p[1]}/${+p[2]}`;
    };
 
    return (
        <>
        <HeaderNav />
            <div style={{ margin: "auto", width: "1000px" }}>
                <Heading as='h1' size='lg' noOfLines={1} mb={5}>
                    イベント一覧
                </Heading>
            <div>

            </div>
            
            <SimpleGrid columns={3} spacingX='40px' spacingY='20px'>
                {Events?.map((e) => {
                    return (                 
                        <Card maxW='sm'>
                            <CardBody>
                                <Image
                                    src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                                    alt='Green double couch with wooden legs'
                                    borderRadius='lg'
                                />
                                <Stack mt='6' spacing='3'>
                                    <Heading size='md'>{e.title}</Heading>
                                    <Text>{handleToDate(e.date)}</Text>
                                    <Text>{e.start_time} - {e.end_time}</Text>
                                    <Text>@{e.place}</Text>
                                </Stack>
                            </CardBody>
                            <CardFooter>
                                <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='blue'>
                                    詳細
                                </Button>
                                <Button variant='ghost' colorScheme='blue'>
                                    編集
                                </Button>
                                <Button variant='ghost' colorScheme='blue'>
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