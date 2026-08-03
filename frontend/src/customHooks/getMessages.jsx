import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const getMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchMessages = async () => {

      if (!selectedUser?._id) {
        return;
      }

      try {
        const result = await axios.get(
          `${serverUrl}/api/message/get/${selectedUser._id}`,
          {
            withCredentials: true,
          }
        );

        console.log("GET MESSAGES:", result.data);

        dispatch(setMessages(result.data));

      } catch (error) {
        console.log(
          "GET MESSAGE ERROR:",
          error.response?.data || error.message
        );
      }
    };

    fetchMessages();
  }, [selectedUser, dispatch]);
};

export default getMessage;