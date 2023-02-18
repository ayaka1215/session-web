import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./routes/events.jsx";
import CreateEvent from "./routes/createEvent.jsx";
import Event from "./routes/event.jsx";
import EditEvent from "./routes/editEvent.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="events" element={<Events />} />
        <Route path="events/create" element={<CreateEvent />} />
        <Route path="events/:id" element={<Event />} />
        <Route path="events/:id/edit" element={<EditEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
