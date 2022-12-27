import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const auth = useAuth();

  return (
    <div className="bg-black fixed top-0 left-0 z-50 w-full h-14 text-white flex gap-4 text-xl">
      {auth.getAuthData().authToken ? true : <Link to="/signin">Sign In</Link>}
      {auth.getAuthData().authToken ? true : <Link to="/signup">Sign Up</Link>}
      <Link to="/">Home</Link>
      {auth.getAuthData().authToken ? <button onClick={() => auth.signOut()}>sign out</button> : false}
      
    </div>
  );
};

export default Navbar;
