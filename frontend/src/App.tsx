import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./Context/AuthContext";
import Navbar from "./Components/Navbar";
import HappinessGrid from "./Pages/Home/HappinessGrid";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="bg-black p-4 flex items-center justify-center">
          <Navbar />
          <div className="w-full absolute top-14">
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<HappinessGrid id="test" />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
