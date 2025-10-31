import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/msg/contacts");
      const unread = res.data.filter((msg) => !msg.read).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  return (
    <MessageContext.Provider value={{ unreadCount, setUnreadCount, fetchUnreadCount }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);
