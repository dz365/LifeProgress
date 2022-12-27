import axios from "axios";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");

  const tailwindInputStyle =
    "rounded-lg px-2 py-1 w-8/12 text-black bg-gray-300 outline outline-offset-2 focus:outline-gray-300";

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/user/create`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: form.email.value,
        password: form.password.value,
        firstName: form.firstname.value,
        lastName: form.lastname.value,
        age: parseInt(form.age.value),
      },
    })
      .then(() => {})
      .catch((err) => {console.log(err)});
  };

  return (
    <div className="min-h-screen bg-black w-full p-4 flex flex-col gap-8 items-center justify-center text-white font-['Varela_Round']">
      <h1 className="text-7xl">sign up</h1>
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
            type="password"
            placeholder="123456789"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={tailwindInputStyle}
          />
        </label>
        <label className="flex justify-between">
          first name
          <input
            placeholder="John"
            name="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={tailwindInputStyle}
          />
        </label>
        <label className="flex justify-between">
          last name
          <input
            placeholder="Smith"
            name="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={tailwindInputStyle}
          />
        </label>
        <label className="flex justify-between">
          age
          <input
            type="number"
            placeholder="25"
            name="age"
            min={0}
            max={150}
            value={parseInt(age)}
            onChange={(e) => setAge(e.target.value)}
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

export default SignUp;
