import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./routes/events.jsx";
import CreateEvent from "./routes/createEvent.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="events" element={<Events />} />
        <Route path="events/create" element={<CreateEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
