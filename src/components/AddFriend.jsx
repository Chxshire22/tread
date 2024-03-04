//1. check profile viewed is NOT currentUser
//2. check profile viewed is NOT already a friend
//3. check profile viewed is NOT already a friend request sent
//4. check profile viewed is NOT already a friend request received
//5. All else, show Add Friend button
//6. On click, send friend request
//7. Last, display "Friends"

//Components Import
import axios from "axios";
import { useUserId } from "./GetCurrentUser";
import { useState, useEffect } from "react";

export default function AddFriend({ userData }) {
  const { currentUser } = useUserId();
  const currentUserId = currentUser?.id;
  const profileUserId = userData?.id;
  const [friendshipsData, setFriendshipsData] = useState(null);

  //1. check profile viewed is NOT currentUser
  const isCurrentUserProfile = currentUserId === profileUserId;

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/friendships`);
      setFriendshipsData(response.data);
    } catch (error) {
      console.error("Error fetching friendships:", error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(friendshipsData);
  }, [currentUserId, profileUserId]);

  //2.1 check if currentUser and profileUser has status FRIENDS. If true, return "Friends"
  const existingFriendship = friendshipsData?.find(
    (friendship) =>
      (friendship.requestorId === currentUserId &&
        friendship.receiverId === profileUserId &&
        friendship.status === "friends") ||
      (friendship.requestorId === profileUserId &&
        friendship.receiverId === currentUserId &&
        friendship.status === "friends")
  );

  const handleAddFriend = async () => {
    try {
      const response = await axios.post(`/api/friendships`, {
        requestorId: currentUserId,
        receiverId: profileUserId,
        status: "pending",
      });
      alert("Friend request sent!");
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  if (isCurrentUserProfile) {
    return null;
  } else if (existingFriendship) {
    return <div>Friends 🧑🏻‍🤝‍🧑🏼 </div>;
  } else {
    return (
      <div>
        <button onClick={handleAddFriend}>Add Friend</button>
      </div>
    );
  }
}
