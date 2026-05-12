import { useState } from "react";
import API from "../services/api";
// import { useNavigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    const response = await API.post(
    "/auth/login",
    formData
    );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

        navigate("/dashboard");
    } catch (error) {
        console.log(error);
      alert("Login Failed");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          TaskFlow Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-indigo-600 text-white p-3 rounded-xl"
        >
          Login
        </button>
        <p className="text-center mt-4">

        Don't have an account?

        <Link
            to="/signup"
            className="text-indigo-600 ml-2"
        >
            Signup
        </Link>

        </p>
      </form>

    </div>
  );
}