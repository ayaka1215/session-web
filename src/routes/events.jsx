import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axios.js";
// import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

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
        <div style={{ margin: "auto", width: "1000px" }}>
            <h1>イベント一覧画面</h1>
            <div>
                <Link to="/">TOP</Link>
            </div>
            <div>
                {Events?.map((e) => {
                    return (
                            <div>
                                <p>{e.title}</p>
                                <p>{e.start_time} - {e.end_time}</p>
                                <p>{e.place}</p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
 }
 
 export default Events;