import React, { useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.png";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { BsEmojiSmile } from "react-icons/bs";
import { FaImages } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./SenderMessage.jsx";
import RecieverMessage from "./ReceiverMessage.jsx";
import { serverUrl } from "../main.jsx";
import axios from "axios";
import { setMessages } from "../redux/messageSlice.js";
import { useEffect } from "react";

function MessageArea() {
  let { selectedUser, userData,socket } = useSelector((state) => state.user);
  let { messages } = useSelector((state) => state.message);

  let dispatch = useDispatch();

  let [showPicker, setShowPicker] = useState(false);
  let [input, setInput] = useState("");
  let [frontendImage, setFrontendImage] = useState(null);
  let [backendImage, setBackendImage] = useState(null);

  let image = useRef();
  const bottomRef = useRef(null);

  const handleImage = (e) => {
    let file = e.target.files[0];

    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

const handleSendMessage = async (e) => {
  e.preventDefault();

  if (!input.trim() && !backendImage) {
    return;
  }

  try {
    const formData = new FormData();

    if (input.trim()) {
      formData.append("message", input);
    }

    if (backendImage) {
      formData.append("image", backendImage);
    }

    const result = await axios.post(
      `${serverUrl}/api/message/send/${selectedUser._id}`,
      formData,
      {
        withCredentials: true,
      }
    );

    console.log("SEND RESPONSE:", result.data);

    dispatch(
      setMessages([
        ...messages,
        result.data,
      ])
    );

    setInput("");
    setBackendImage(null);
    setFrontendImage(null);

  } catch (error) {
    console.log("SEND ERROR:", error);
  }
};

  const onEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
    setShowPicker(false);
  };


  useEffect(() => {
  const handleMessage = (mess) => {
    dispatch(setMessages([...messages, mess]));
  };

  socket.on("newMessage", handleMessage);

  return () => socket.off("newMessage", handleMessage);
}, [socket, messages, dispatch]);
useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);


  return (
    <div
  className={`lg:w-[70%] w-full h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 ${
    selectedUser ? "flex" : "hidden lg:flex"
  }`}
>
      {selectedUser && (
        <div className="w-full h-[100vh] flex flex-col">
          {/* Header */}
    
          <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-5 py-4 flex items-center justify-between shadow-sm">

  <div className="flex items-center gap-4">

    <button
      onClick={() => {
        dispatch(setSelectedUser(null));
        setShowPicker(false);
      }}
      className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition"
    >
      <IoMdArrowRoundBack className="text-2xl text-slate-700" />
    </button>

    <div className="relative">

      <img
        src={selectedUser?.image || dp}
        alt=""
        className="w-12 h-12 rounded-full object-cover"
      />

      {selectedUser && (
        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></span>
      )}

    </div>

    <div>

      <h2 className="text-lg font-semibold text-slate-800">
        {selectedUser?.name || "User"}
      </h2>

      <p className="text-sm text-green-600">
        Online
      </p>

    </div>

  </div>

</div>

          {/* Messages */}
          {/* Messages */}
<div className="flex-1 w-full overflow-y-auto px-[10px] sm:px-[20px] pt-[20px] pb-[110px] flex flex-col gap-3">

  {messages?.map((mess) => (
    mess.sender === userData?._id ? (
      <SenderMessage
  key={mess._id}
  message={mess.message}
  image={mess.image}
  createdAt={mess.createdAt}
/>
    ) : (
      <RecieverMessage
  key={mess._id}
  message={mess.message}
  image={mess.image}
  createdAt={mess.createdAt}
/>

    )
  ))}

   <div ref={bottomRef}></div>

</div>
        </div>
      )}

      {!selectedUser && (
        <div className="w-full h-full flex flex-col justify-center items-center px-4 text-center">
          <h1 className="text-gray-700 font-bold text-[35px] sm:text-[50px]">
            Welcome to Chatly
          </h1>

          <span className="text-gray-700 font-semibold text-[20px] sm:text-[25px]">
            Chat Friendly..!
          </span>
        </div>
      )}


      {selectedUser && (
  <div className="sticky bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 px-4 py-3 z-30">

    {/* Image Preview */}
    {frontendImage && (
      <div className="mb-3 relative w-fit">
        <img
          src={frontendImage}
          alt="preview"
          className="w-24 h-24 rounded-xl object-cover border border-slate-200 shadow-sm"
        />
      </div>
    )}

    <form
      onSubmit={handleSendMessage}
      className="flex items-center gap-3 bg-white rounded-2xl border border-slate-200 shadow-sm px-4 py-3"
    >
      {/* Emoji */}
      <div className="relative">
        <BsEmojiSmile
          className="text-2xl text-slate-500 cursor-pointer hover:text-sky-500 transition"
          onClick={() => setShowPicker((prev) => !prev)}
        />

        {showPicker && (
          <div className="absolute bottom-12 left-0 z-50">
            <EmojiPicker
              width={300}
              height={350}
              onEmojiClick={onEmojiClick}
            />
          </div>
        )}
      </div>

      {/* Hidden Image Input */}
      <input
        type="file"
        accept="image/*"
        hidden
        ref={image}
        onChange={handleImage}
      />

      {/* Text Input */}
      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
      />

      {/* Image Button */}
      <button
        type="button"
        onClick={() => image.current.click()}
        className="text-slate-500 hover:text-sky-500 transition"
      >
        <FaImages className="text-2xl" />
      </button>

      {/* Send Button */}
      {(input.trim() || backendImage) && (
        <button
          type="submit"
          className="w-11 h-11 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition"
        >
          <IoIosSend className="text-2xl" />
        </button>
      )}
    </form>

  </div>
)}
    </div>
  );
}

export default MessageArea;
