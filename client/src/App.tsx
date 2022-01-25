import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Error } from "./page/error";
import { Home } from "./page/home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
