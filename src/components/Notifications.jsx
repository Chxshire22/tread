"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Notifications({ username }) {
  const [userId, setUserId] = useState();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await axios.get(`/api/user/${username}`);
        const userId = userData.data.id;
        setUserId(userId);
        const responseNotifications = await axios.get(
          `/api/notifications/${userId}`
        );
        setNotifications(responseNotifications.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => {
          console.log(notification);
        })}
      </ul>
    </div>
  );
}
