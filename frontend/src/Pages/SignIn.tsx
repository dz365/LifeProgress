import axios from "axios";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();

  const tailwindInputStyle =
    "rounded-lg px-2 py-1 w-8/12 text-black bg-gray-300 outline outline-offset-2 focus:outline-gray-300";

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
        auth.updateData({
          authData: JSON.stringify(res.data.authData),
          authToken: res.data.token,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (auth.getAuthData().authToken) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-black w-full p-4 flex flex-col gap-8 items-center justify-center text-white font-['Varela_Round']">
      <h1 className="text-7xl">sign in</h1>
      <form
        onSubmit={(e) => submitForm(e)}
        className="w-1/3 flex flex-col gap-4"
      >
        <label className="flex justify-between">
          email
          <input
            placeholder="johnsmith123@email.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={tailwindInputStyle}
          />
        </label>
        <label className="flex justify-between">
          password
          <input
            placeholder="123456789"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={tailwindInputStyle}
          />
        </label>
        <input
          type="submit"
          value="submit"
          className="w-1/3 self-center text-xl rounded-3xl border-2 border-gray-500 bg-gray-600 cursor-pointer transition duration-300 hover:scale-110 hover:bg-gray-800"
        />
      </form>
    </div>
  );
};

export default SignIn;
