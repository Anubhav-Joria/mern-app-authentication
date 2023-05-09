import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Private from "./Components/Private";
import Authentication from "./Components/Authentication";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/homepage" element={<Private />} />
      </Routes>
    </div>
  );
}

export default App;
