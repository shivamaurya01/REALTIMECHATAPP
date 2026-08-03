import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { serverUrl } from "../main";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function SignUp() {
  let navigate = useNavigate();
  let [show, setShow] = useState(false);

  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");
  let dispatch = useDispatch()


  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(serverUrl);
      console.log(`${serverUrl}/api/auth/signup`);
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          userName,
          email,
          password,
        },
        { withCredentials: true },
      );
     dispatch(setUserData(result.data))
     
      alert("Signup Successful!");
      navigate("/profile");
      setEmail("");
      setPassword("");
      setLoading(false);
       setError("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error?.response?.data?.message);
     
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-100 via-sky-50 to-cyan-100 flex items-center justify-center p-5 overflow-hidden">
   <div className="relative z-10 w-full max-w-5xl min-h-[620px] bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/40 grid lg:grid-cols-2">
       <div className="hidden lg:flex relative bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-600 overflow-hidden">

  <div className="absolute -top-16 -left-16 w-52 h-52 rounded-full bg-white/10 blur-3xl"></div>

  <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-cyan-300/20 blur-3xl"></div>

  <div className="relative z-10 flex flex-col justify-center px-12 text-white">

    <h1 className="text-5xl font-extrabold tracking-wide">
      💬 Chatly
    </h1>

    <p className="mt-5 text-lg leading-8 text-cyan-100">
      Join thousands of users and start chatting instantly with your friends in a fast and secure environment.
    </p>

    <div className="mt-12 space-y-5">

      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-white"></div>
        <span className="text-lg">Create Your Account</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-white"></div>
        <span className="text-lg">Share Images</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-white"></div>
        <span className="text-lg">Chat Anywhere</span>
      </div>

    </div>

  </div>

</div>
      <form
  onSubmit={handleSignUp}
  className="flex flex-col justify-center px-8 sm:px-12 py-10"
>
  <div className="mb-8">

    <h2 className="text-4xl font-bold text-slate-800">
      Create Account
    </h2>

    <p className="text-gray-500 mt-2">
      Join Chatly and start chatting instantly.
    </p>

  </div>

  {/* Username */}

  <div className="mb-5">

    <label className="text-sm font-medium text-gray-600">
      Username
    </label>

    <input
      type="text"
      placeholder="Enter username"
      value={userName}
      onChange={(e) => setUserName(e.target.value)}
      className="mt-2 w-full h-12 rounded-xl border border-slate-300 px-4 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition"
    />

  </div>

  {/* Email */}

  <div className="mb-5">

    <label className="text-sm font-medium text-gray-600">
      Email
    </label>

    <input
      type="email"
      placeholder="Enter email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="mt-2 w-full h-12 rounded-xl border border-slate-300 px-4 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition"
    />

  </div>

  {/* Password */}

  <div className="mb-5">

    <label className="text-sm font-medium text-gray-600">
      Password
    </label>

    <div className="relative mt-2">

      <input
        type={show ? "text" : "password"}
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full h-12 rounded-xl border border-slate-300 px-4 pr-20 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-600 font-medium"
      >
        {show ? "Hide" : "Show"}
      </button>

    </div>

  </div>

  {error && (
    <p className="text-red-500 text-sm mb-4">
      {error}
    </p>
  )}

  <button
    type="submit"
    disabled={loading}
    className="w-full h-12 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold transition duration-200 shadow-lg"
  >
    {loading ? "Creating Account..." : "Create Account"}
  </button>

  <p className="text-center text-gray-500 mt-8">

    Already have an account?

    <span
      onClick={() => navigate("/login")}
      className="text-sky-600 font-semibold cursor-pointer ml-2 hover:underline"
    >
      Login
    </span>

  </p>

</form>
      </div>
    </div>
  );
}

export default SignUp;
