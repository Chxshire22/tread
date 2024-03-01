"use client";

import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import { BACKEND_URL } from "@/app/constants";
import { useState, useEffect, useContext, createContext } from "react";
const UserContext = createContext();

function GetCurrentUser({ children }) {
  const { user, isLoading } = useUser();
  const [currentUser, setCurrentUser] = useState(null);

  const checkCurrentUser = async () => {
    if (user) {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/user/${user.name}`);
        setCurrentUser(response.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (user && !isLoading) {
      checkCurrentUser();
    }
  }, [user, isLoading]);

  return <UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>;
}

export const useUserId = () => {
  return useContext(UserContext);
};

export default GetCurrentUser;
