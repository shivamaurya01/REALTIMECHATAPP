import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.png";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from "axios";
import { serverUrl } from "../main";
import {
  setSearchData,
  setSelectedUser,
  setUserData,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SideBar() {
  let { userData, otherUsers, selectedUser, onlineUsers, searchData } =
    useSelector((state) => state.user);
  let [search, setSearch] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [input, setInput] = useState("");

  const handleLogOut = async () => {
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
      dispatch(setUserData(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = async () => {
    try {
      console.log("Searching:", input);

      if (!input.trim()) {
        dispatch(setSearchData([]));
        return;
      }

      const result = await axios.get(
        `${serverUrl}/api/user/search?query=${input.trim()}`,
        {
          withCredentials: true,
        },
      );

      console.log(result.data);

      dispatch(setSearchData(result.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    //
    <div
 className={`lg:w-[30%] w-full h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50 border-r border-slate-200 flex flex-col ${
  !selectedUser ? "flex" : "hidden lg:flex"
}`}
>

      <div className="relative bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-600 rounded-b-[35px] px-6 pt-5 pb-4 shadow-2xl overflow-hidden">

  {/* Background Blur Circles */}
  <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-3xl"></div>
  <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-cyan-300/20 blur-3xl"></div>

  {/* Logo */}
  <div className="relative flex justify-between items-center">

    <div>
      <h1 className="text-3xl font-extrabold text-white tracking-wide">
        Chatly
      </h1>

      <p className="text-sky-100 text-sm mt-1">
        Stay connected anytime
      </p>
    </div>

    <div
      onClick={() => navigate("/profile")}
      className="relative cursor-pointer group"
    >
      <img
        src={userData.image || dp}
        alt=""
        className="w-14 h-14 rounded-2xl object-cover border-[3px] border-white shadow-xl transition duration-300 group-hover:scale-105"
      />

      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-400 border-[3px] border-white"></span>
    </div>

  </div>

  {/* Welcome Card */}
{/* 
  <div className="relative mt-6 bg-white/15 backdrop-blur-xl rounded-3xl p-5 border border-white/20">

    <p className="text-sky-100 text-sm">
      Welcome Back 👋
    </p>

    <h2 className="text-2xl font-bold text-white mt-1">
      {userData.name || "User"}
    </h2>

    <p className="text-white/80 text-sm mt-1">
      Ready to start chatting?
    </p>


  </div> */}

  <div className="mt-4">
  <h2 className="text-white text-lg font-semibold">
    Welcome back, {userData.name || "User"} 👋
  </h2>

  <p className="text-sky-100 text-sm">
    Start a new conversation
  </p>
</div>

  {/* Search */}

  <div className="mt-6">

    {!search ? (

      <button
        onClick={() => setSearch(true)}
        className="w-full h-14 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center gap-3 hover:bg-white/30 transition-all duration-300"
      >

        <IoIosSearch className="text-2xl" />

        <span className="font-medium">
          Search Friends
        </span>

      </button>

    ) : (

      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative"
      >

        <div className="flex items-center bg-white rounded-2xl h-14 px-4 shadow-xl">

          <IoIosSearch className="text-2xl text-gray-500" />

          <input
            type="text"
            placeholder="Search username..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 outline-none bg-transparent"
          />

          <RxCross2
            className="text-2xl cursor-pointer text-gray-500 hover:text-red-500 transition"
            onClick={() => {
              setSearch(false);
              setInput("");
              dispatch(setSearchData([]));
            }}
          />

        </div>

        {input.trim() && (
          <div className="absolute left-0 top-16 w-full bg-white rounded-2xl shadow-2xl overflow-hidden max-h-72 overflow-y-auto z-50">

            {searchData?.length ? (
              searchData.map((user) => (
                <div
                  key={user._id}
                  onClick={() => {
                    dispatch(setSelectedUser(user));
                    setSearch(false);
                    setInput("");
                    dispatch(setSearchData([]));
                  }}
                  className="flex items-center gap-4 p-4 hover:bg-sky-50 transition cursor-pointer"
                >

                  <img
                    src={user.image || dp}
                    className="w-12 h-12 rounded-full object-cover"
                    alt=""
                  />

                  <div>

                    <h1 className="font-semibold">
                      {user.name || user.userName}
                    </h1>

                    <p className="text-sm text-gray-500">
                      @{user.userName}
                    </p>

                  </div>

                </div>
              ))
            ) : (
              <div className="py-6 text-center text-gray-500">
                No user found
              </div>
            )}

          </div>
        )}

      </form>

    )}

  </div>

  {/* Online Users */}

  {!search && (

    <div className="mt-7">

      <div className="flex justify-between items-center mb-4">

        <h3 className="text-white font-semibold">
          Online Friends
        </h3>

        <span className="text-xs text-white/70">
          {onlineUsers?.length || 0} Online
        </span>

      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">

        {otherUsers?.map(
          (user) =>
            onlineUsers?.includes(user._id) && (
              <div
                key={user._id}
                onClick={() => dispatch(setSelectedUser(user))}
                className="relative cursor-pointer flex-shrink-0 group"
              >

                <img
                  src={user.image || dp}
                  alt=""
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                />

                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white"></span>

              </div>
            )
        )}

      </div>

    </div>

  )}

</div>
  <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3 min-h-0">
  <h2 className="text-gray-700 text-sm font-semibold uppercase tracking-wider px-2">
    Conversations
  </h2>

  {otherUsers?.map((user) => {
    const isSelected = selectedUser?._id === user._id;
    const isOnline = onlineUsers?.includes(user._id);

    return (
      <div
        key={user._id}
        onClick={() => dispatch(setSelectedUser(user))}
        className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
          isSelected
            ? "bg-sky-500 text-white shadow-md"
            : "bg-white hover:bg-sky-50 shadow-sm hover:shadow-md"
        }`}
      >
        <div className="relative flex-shrink-0">
          <img
            src={user.image || dp}
            alt=""
            className="w-14 h-14 rounded-full object-cover"
          />

          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white"></span>
          )}
        </div>

        <div className="flex-1 overflow-hidden">
          <h3
            className={`font-semibold truncate ${
              isSelected ? "text-white" : "text-gray-800"
            }`}
          >
            {user.name || user.userName}
          </h3>

          <p
            className={`text-sm ${
              isSelected ? "text-sky-100" : "text-gray-500"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>

        {isOnline && (
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        )}
      </div>
    );
  })}
</div>

{/* Bottom Logout */}
<div className="p-4 border-t border-slate-200 bg-white/80 backdrop-blur-sm">
  <button
    onClick={handleLogOut}
    className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-400 text-white py-3 font-semibold hover:bg-red-400 transition-all duration-200"
  >
    <RiLogoutCircleLine className="text-xl" />
    Logout
  </button>
</div>
    </div>
  );
}

export default SideBar;
