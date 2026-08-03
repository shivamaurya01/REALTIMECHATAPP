import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import dp from "../assets/dp.png";

function SenderMessage({ message, image,createdAt }) {
  const { userData } = useSelector((state) => state.user);

  // const scroll = useRef(null);

  // useEffect(() => {
  //   if (scroll.current) {
  //     scroll.current.scrollIntoView({
  //       behavior: "smooth",
  //     });
  //   }
  // }, [message, image]);

  // const handleImageScroll = () => {
  //   if (scroll.current) {
  //     scroll.current.scrollIntoView({
  //       behavior: "smooth",
  //     });
  //   }
  // };

  const messageTime = createdAt
  ? new Date(createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  : "";

 return (
  <div
    // ref={scroll}
    className="w-full flex justify-end items-end gap-2 px-2 py-1"
  >
    {/* Message Bubble */}
    <div className="max-w-[75%] bg-sky-500 text-white rounded-2xl rounded-br-md shadow-sm px-4 py-3">

      {image && (
        <img
          src={image}
          alt=""
          // onLoad={handleImageScroll}
          className="w-full max-w-[250px] max-h-[260px] object-cover rounded-xl mb-3"
        />
      )}

      {message && (
        <p className="text-[15px] leading-6 break-words whitespace-pre-wrap">
          {message}
        </p>
      )}
      <div className="flex justify-end mt-2">
  <span className="text-[11px] text-sky-100">
    {messageTime}
  </span>
</div>

    </div>

    {/* Profile */}
    <img
      src={userData?.image || dp}
      alt=""
      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
    />
  </div>
);
}

export default SenderMessage;