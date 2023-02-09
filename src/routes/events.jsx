import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axios.js";
import { Card, Heading, Text, Image, Stack, CardBody, ButtonGroup, Button, CardFooter } from '@chakra-ui/react'

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
        <div>
            <h1>イベント一覧画面</h1>
            <div>
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
            </div>
        </div>
    );
 }
 
 export default Events;