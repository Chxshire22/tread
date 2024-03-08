"use client";

import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState, useEffect, useContext, createContext } from "react";
const UserContext = createContext();

function GetCurrentUser({ children }) {
  const { user, isLoading } = useUser();
  const [currentUser, setCurrentUser] = useState(null);

  const checkCurrentUser = async () => {
    if (user) {
      try {
        // This route is to get user from DB based on user from Auth0
        // user.name is actually an EMAIL in Auth0
        const response = await axios.get(`/api/user/${user.name}`);
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

//HOW TO USE:
// 1. import { useUserId } from "./GetCurrentUser";
// 2. const { currentUser } = useUserId();
// ASSIGN IF NEED:
// 3. const currentUserId = currentUser?.id;
