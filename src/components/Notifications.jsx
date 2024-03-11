"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Notifications({ username }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await axios.get(`/api/user/${username}`);
        const userId = userData.data.id;
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

  const handleClick = async (notificiationId) => {
    try {
      await axios.put(`/api/notifications`, {
        notificationId: notificiationId,
        viewed: true
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Notifications:</h2>
      <ul>
        {notifications.map((notification) => (
          <Link
            href={notification.gotoUrl}
            key={notification.id}
            onClick={() => handleClick(notification.id)}
          >
            <li>
              {notification.content} -{" "}
              {notification.viewed ? "Viewed" : "Not Viewed"}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
