import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./routes/events.jsx";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="events" element={<Events />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
