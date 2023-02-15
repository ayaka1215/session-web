import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./routes/events.jsx";
import CreateEvent from "./routes/createEvent.jsx";
import Event from "./routes/event.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="events" element={<Events />} />
        <Route path="events/create" element={<CreateEvent />} />
        <Route path="events/:id" element={<Event />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
