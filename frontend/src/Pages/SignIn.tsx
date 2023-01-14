import axios from "axios";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router";
import Alert from '@mui/material/Alert';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInErrMsg, setSignInErrMsg] = useState("");

  const auth = useAuth();

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/user/signin`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: form.email.value,
        password: form.password.value,
      },
    })
      .then((res) => {
        setSignInErrMsg("")
        auth.updateData({
          authData: JSON.stringify(res.data.authData),
          authToken: res.data.token,
        });
      })
      .catch((err) => {
        setSignInErrMsg(
          (err.response && err.response.data && err.response.data.message) ||
            "A server error has occurred. Please try again later."
        );
      });
  };

  if (auth.getAuthData().authToken) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-black w-full p-4 flex flex-col gap-8 items-center justify-center text-white font-['Varela_Round']">
      <h1 className="text-7xl">sign in</h1>
      {signInErrMsg == "" ? false : <Alert variant="filled" severity="error">{signInErrMsg}</Alert>}
      <form
        onSubmit={(e) => submitForm(e)}
        className="w-1/4 flex flex-col gap-4 items-center"
      >
        <label className="flex gap-2 rounded-lg px-2 py-1 text-indigo-900 bg-gray-300">
          <p className="text-5xl"><EmailIcon fontSize="inherit" /></p>
          <input
            placeholder="Enter your email"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-300 outline-none border-indigo-500 focus:border-b-4"
          />
        </label>
        <label className="flex gap-2 rounded-lg px-2 py-1 text-indigo-900 bg-gray-300">
        <p className="text-5xl"><LockIcon fontSize="inherit" /></p>
          <input
            type="password"
            required
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-300 outline-none border-indigo-500 focus:border-b-4"
          />
        </label>
        <input
          type="submit"
          value="submit"
          className="w-1/3 self-center text-xl rounded-3xl border-2 border-gray-500 bg-blue-900 cursor-pointer transition duration-300 hover:scale-110 hover:bg-gray-800"
        />
      </form>
    </div>
  );
};

export default SignIn;
