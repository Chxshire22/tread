"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function PendingRequest({ username }) {
  const [pendingFriendships, setPendingFriendships] = useState([]);

  const fetchData = async () => {
    try {
      const userData = await axios.get(`/api/user/${username}`);
      const userId = userData.data.id;
      const responsePending = await axios.get(`/api/friendships/pending`);
      const validPending = responsePending.data.filter((pendingRequest) => {
        return pendingRequest.receiverId === userId;
      });
      setPendingFriendships(validPending);
    } catch (error) {
      console.error("Error fetching friendships:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddFriend = async (friendshipId, newStatus) => {
    try {
      await axios.put(`/api/friendships`, {
        friendshipId: friendshipId,
        newStatus: newStatus
      });
      if (newStatus == "friends") {
        alert("Friend request accepted!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div>
        <h2>Pending Request: </h2>
        <ul>
          {pendingFriendships.map((friendship) => (
            <div key={friendship.id} style={{ display: "flex" }}>
              <li>{friendship.Requestor.username}</li>
              <button
                onClick={() => handleAddFriend(friendship.id, "friends")}
                style={{ marginLeft: "10px" }}
              >
                Accept
              </button>
              <button
                onClick={() => handleAddFriend(friendship.id, "rejected")}
                style={{ marginLeft: "10px" }}
              >
                Decline
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
