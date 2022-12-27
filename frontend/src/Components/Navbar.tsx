import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const auth = useAuth();

  const navbarItem = (child: JSX.Element) => {
    return <div className="h-full px-4 flex items-center border-x-2 border-neutral-800">
      {child}
    </div>;
  };

  return (
    <div className="bg-neutral-900 fixed top-0 left-0 z-50 w-full h-14 text-white flex text-xl ">
      {navbarItem(<Link to="/">home</Link>)}
      <div className="grow"></div>
      {auth.getAuthData().authToken ? true : navbarItem(<Link to="/signin">sign in</Link>)}
      {auth.getAuthData().authToken ? true : navbarItem(<Link to="/signup">sign up</Link>)}
      {auth.getAuthData().authToken ? (
        navbarItem(<button onClick={() => auth.signOut()}>sign out</button>)
      ) : (
        false
      )}
    </div>
  );
};

export default Navbar;
