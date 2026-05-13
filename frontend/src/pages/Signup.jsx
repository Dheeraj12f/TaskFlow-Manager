import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/signup",
        {
          name: name,
          email: email,
          password: password,
        }
      );

      console.log(response.data);

      alert("Signup Successful");

      navigate("/");

    } catch (error) {

      console.log(error.response);

      alert("Signup Failed because of wrong details or user already exists");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          TaskFlow Signup
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded-xl mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700"
        >
          Signup
        </button>

        <p className="text-center mt-4">

          Already have an account?

          <Link
            to="/"
            className="text-indigo-600 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}