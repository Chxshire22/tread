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
import { PersonFillCheck, PersonAdd } from "react-bootstrap-icons";

export default function AddFriend({ userData }) {
  const { currentUser } = useUserId();
  const currentUserId = currentUser?.id;
  const profileUserId = userData?.id;
  const [pendingFriendshipsData, setPendingFriendshipsData] = useState(null);
  const [isFriendsData, setIsFriendsData] = useState(null);

  // check profile viewed is NOT currentUser
  const isCurrentUserProfile = currentUserId === profileUserId;

  const fetchData = async () => {
    try {
      const responsePending = await axios.get(`/api/friendships/pending`);
      const responseFriends = await axios.get(`/api/friendships/friends`);

      setPendingFriendshipsData(responsePending.data);
      setIsFriendsData(responseFriends.data);
    } catch (error) {
      console.error("Error fetching friendships:", error);
    }
  };

  //Find all pending friendships
  const pendingFriendship = pendingFriendshipsData?.find(
    (friendship) =>
      (friendship.requestorId === currentUserId && friendship.receiverId === profileUserId) ||
      (friendship.requestorId === profileUserId && friendship.receiverId === currentUserId)
  );

  const ifFriendshipExists = isFriendsData?.find(
    (friendship) =>
      (friendship.requestorId === currentUserId && friendship.receiverId === profileUserId) ||
      (friendship.requestorId === profileUserId && friendship.receiverId === currentUserId)
  );

  useEffect(() => {
    fetchData();
  }, [currentUserId, profileUserId]);

  const handleAddFriend = async () => {
    try {
      await axios.post(`/api/friendships`, {
        requestorId: currentUserId,
        receiverId: profileUserId,
        status: "pending",
      });
      const responseNotification = await axios.post("/api/notifications", {
        userId: profileUserId,
        type: "add_friend",
        content: `${currentUser.username} added you as a friend`,
        viewed: false,
        gotoUrl: `${window.location.origin}/user/${userData.username}/friends`,
      });
      console.log(responseNotification.data);
      alert("Friend request sent!");
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  if (isCurrentUserProfile) {
    return null;
  } else if (pendingFriendship) {
    return <div className="btn btn-outline-secondary"> Request Sent 💌 Pending </div>;
  } else if (ifFriendshipExists) {
    return (
      <div className="btn btn-outline-success">
        Friends <PersonFillCheck size={20} />
      </div>
    );
  } else {
    return (
      <div>
        <button className="btn btn-outline-info" onClick={handleAddFriend}>
          Add Friend <PersonAdd size={20} />{" "}
        </button>
      </div>
    );
  }
}
