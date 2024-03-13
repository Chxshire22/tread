"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { EyeFill } from "react-bootstrap-icons";
import { EyeSlash } from "react-bootstrap-icons";

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
        viewed: true,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="notification-container">
      <ul className="notification-list">
        {notifications.map((notification) => (
          <Link
            href={notification.gotoUrl}
            key={notification.id}
            onClick={() => handleClick(notification.id)}
            className="notification-link"
          >
            <li
              className={
                notification.viewed
                  ? "viewed notification-item"
                  : "not-viewed notification-item"
              }
            >
              {notification.content} -{" "}
              {notification.viewed ? <EyeSlash /> : <EyeFill />}
            </li>
            <hr className="hr-separator" />
          </Link>
        ))}
      </ul>
    </div>
  );
}
