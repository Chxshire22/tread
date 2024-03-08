"use client";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

export default function FriendshipsList({ username }) {
  const [userId, setUserId] = useState();
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await axios.get(`/api/user/${username}`);
        const userId = userData.data.id;
        setUserId(userId);
        const responseFriends = await axios.get(`/api/friendships/${userId}`);
        console.log(responseFriends.data);
        setFriends(responseFriends.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Friends</h2>
      <ul>
        {friends.map((friend) =>
          friend.Requestor.id === userId ? (
            <li key={friend.id}>
              {friend.Receiver.username} - {friend.status}
            </li>
          ) : (
            <li key={friend.id}>
              {friend.Requestor.username} - {friend.status}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
