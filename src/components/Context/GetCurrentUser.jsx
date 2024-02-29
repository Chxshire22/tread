import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import { BACKEND_URL } from "@/app/constants";
import { useState, useEffect, useContext, createContext } from "react";
const UserContext = createContext();

function GetCurrentUser({ children }) {
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const checkCurrentUser = async () => {
      if (user) {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/users/${user.name}`);
          setCurrentUser(response.data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    if (user) {
      checkCurrentUser();
    }
    return <UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>;
  }, [children, currentUser, user]);
}

export const useUserId = () => {
  return useContext(UserContext);
};

export default GetCurrentUser;
