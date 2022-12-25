import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-black fixed top-0 left-0 z-50 w-full h-20 text-white flex gap-4">
      <Link to="/signin">Sign In</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Navbar;
