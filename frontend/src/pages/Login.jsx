import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { useDispatch,useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
function Login() {
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);
  let dispatch = useDispatch()
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
    
      let result = await axios.post(
        `${serverUrl}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
    

      dispatch(setUserData(result.data))
      alert("Login Successful!");
      navigate("/")
      setEmail("");
      setPassword("");
      setLoading(false);
      setError("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.response.data.message);
      
    }
  };
  return (
   
    <div className="relative min-h-screen bg-gradient-to-br from-slate-100 via-sky-50 to-cyan-100 flex items-center justify-center p-5 overflow-hidden">
     
      <div className="relative z-10 w-full max-w-5xl min-h-[650px] bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/40 grid lg:grid-cols-2">
       {/* Left Side - Branding */}
<div className="hidden lg:flex relative bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-600 overflow-hidden">

  {/* Decorative Blobs */}
  <div className="absolute -top-16 -left-16 w-52 h-52 rounded-full bg-white/10 blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-cyan-300/20 blur-3xl"></div>

  <div className="relative z-10 flex flex-col justify-center px-12 text-white">

    <h1 className="text-5xl font-extrabold tracking-wide">
      💬 Chatly
    </h1>

    <p className="mt-5 text-lg leading-8 text-cyan-100">
      Connect instantly with your friends and enjoy real-time messaging
      in a clean, fast and secure experience.
    </p>

    <div className="mt-12 space-y-5">

      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-white"></div>
        <span className="text-lg">Real-Time Messaging</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-white"></div>
        <span className="text-lg">Share Images Instantly</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-white"></div>
        <span className="text-lg">Simple & Secure</span>
      </div>

    </div>

  </div>

</div>
        <form
  onSubmit={handleLogin}
  className="flex flex-col justify-center px-8 sm:px-12 py-10 bg-white"
>
  {/* Mobile Logo */}
  <div className="lg:hidden text-center mb-8">
    <h1 className="text-4xl font-extrabold text-sky-600">💬 Chatly</h1>
    <p className="text-gray-500 mt-2">
      Connect with friends instantly
    </p>
  </div>

  {/* Heading */}
  <h2 className="text-3xl font-bold text-slate-800">
    Welcome Back 👋
  </h2>

  <p className="text-slate-500 mt-2 mb-8">
    Login to continue chatting with your friends.
  </p>

  {/* Email */}
  <div className="mb-5">
    <label className="block text-sm font-semibold text-slate-700 mb-2">
      Email Address
    </label>

    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full h-14 rounded-xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition"
    />
  </div>

  {/* Password */}
  <div className="mb-5">
    <label className="block text-sm font-semibold text-slate-700 mb-2">
      Password
    </label>

    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full h-14 rounded-xl border border-slate-300 bg-slate-50 px-4 pr-20 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition"
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

  {/* Error */}
  {error && (
    <p className="text-red-500 text-sm mb-4">
      {error}
    </p>
  )}

  {/* Login Button */}
  <button
    type="submit"
    disabled={loading}
    className="w-full h-14 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-lg font-semibold shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300 disabled:opacity-70"
  >
    {loading ? "Logging in..." : "Login"}
  </button>

  {/* Divider */}
  <div className="flex items-center gap-3 my-8">
    <div className="flex-1 h-px bg-slate-200"></div>
    <span className="text-slate-400 text-sm">OR</span>
    <div className="flex-1 h-px bg-slate-200"></div>
  </div>

  {/* Signup */}
  <p className="text-center text-slate-600">
    Don't have an account?{" "}
    <span
      onClick={() => navigate("/signup")}
      className="text-sky-600 font-semibold cursor-pointer hover:underline"
    >
      Create Account
    </span>
  </p>
</form>
      </div>
    </div>
  );
}

export default Login;
