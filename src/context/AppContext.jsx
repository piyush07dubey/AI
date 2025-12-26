import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyUserData, dummyChats } from "../assets/assets.js";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Fetch user
  const fetchUser = async () => {
    setUser(dummyUserData);
  };

  // Fetch chats after user exists
  const fetchUsersChats = async () => {
    setChats(dummyChats);
    setSelectedChat(dummyChats[0]);
  };

  // Run once on app load
  useEffect(() => {
    fetchUser();
  }, []);

  // Run when user changes
  useEffect(() => {
    if (user) {
      fetchUsersChats();
    } else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user]);

  // Theme handling
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = {
    user,
    setUser,
    fetchUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    theme,
    setTheme,
    navigate,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
