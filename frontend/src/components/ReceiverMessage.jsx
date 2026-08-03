import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import dp from "../assets/dp.png";

function ReceiverMessage({ message, image , createdAt }) {

  const { selectedUser } = useSelector((state) => state.user);

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
    className="w-full flex items-end gap-2 px-2 py-1"
  >
    {/* Profile */}
    <img
      src={selectedUser?.image || dp}
      alt=""
      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
    />

    {/* Message Bubble */}
    <div className="max-w-[75%] bg-white border border-slate-200 rounded-2xl rounded-bl-md shadow-sm px-4 py-3">

      {image && (
        <img
          src={image}
          alt=""
          // onLoad={handleImageScroll}
          className="w-full max-w-[250px] max-h-[260px] object-cover rounded-xl mb-3"
        />
      )}

      {message && (
        <p className="text-[15px] leading-6 text-slate-700 break-words whitespace-pre-wrap">
          {message}
        </p>
      )}

   <div className="flex justify-end mt-2">
  <span className="text-[11px] text-slate-400">
    {messageTime}
  </span>
</div>

    </div>
  </div>
);
}

export default ReceiverMessage;