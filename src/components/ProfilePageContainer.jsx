"use client";
import Image from "next/image";
import { Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
//Components Import
import { SendMessage } from "./Buttons";
import AddFriend from "./AddFriend";
import { useUserId } from "./GetCurrentUser";
import { useRouter } from "next/navigation";

export default function ProfilePageContainer({ username }) {
  const [userData, setUserData] = useState(null);
  const [friendshipExists, setFriendshipExists] = useState(null);
  const { currentUser } = useUserId();
  const currentUserId = currentUser?.id;

  const router = useRouter();

  useEffect(() => {
    console.log(`curr user`, currentUserId);
    const fetchData = async () => {
      try {
        // can use currentUser.id + userData.id to check if friendship exists
        // use sequelize to return friendship row WHERE currentUser.id == requestorId or receiverId AND userData.id == requestorId or receiverId
        const response = await axios.get(`/api/user/${username}`);
        // this is downloading all the existing friendship of the currentUser which is resource intensive, causing the app to slow down
        const friendshipRes = await axios.get(
          `/api/friendships/${currentUserId}`
        );
        const friendsData = friendshipRes.data.filter(
          (friend) => friend.status === "friends"
        );
        const ifFriendshipExists = friendsData?.find(
          (friendship) =>
            (friendship.requestorId === currentUserId &&
              friendship.receiverId === response.data.id) ||
            (friendship.requestorId === response.data.id &&
              friendship.receiverId === currentUserId)
        );
        setUserData(response.data);
        setFriendshipExists(ifFriendshipExists);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (username) {
      fetchData();
    }
  }, [currentUserId]);

  useEffect(() => {
    console.log(friendshipExists);
  }, [friendshipExists]);

  const handleStartChat = async () => {
    //find or create chatroom and navigate to chatroom

    const friendshipId = friendshipExists.id;
    const response = await axios.post("/api/chatrooms", { friendshipId });
    const chatroomId = response.data.id;
    console.log(chatroomId);
    router.push(`/chat/${chatroomId}`);

  };

  return (
    <div>
      {" "}
      <Image
        src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
        alt="placeholder img"
        width={100}
        height={100}
      />
      <div>
        <strong>{"@" + userData?.username}</strong>
        <AddFriend userData={userData} />
      </div>
      <Container>{userData?.bio}</Container>
      <br />
      {friendshipExists && (
        <button onClick={handleStartChat}>Send Message</button>
      )}
    </div>
  );
}
