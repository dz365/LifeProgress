import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import HappinessGrid from "./HappinessGrid";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <Router>
      <div className="bg-black p-4 flex items-center justify-center">
        <Navbar />
        <div className="w-full absolute top-20">
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<HappinessGrid id="test" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
