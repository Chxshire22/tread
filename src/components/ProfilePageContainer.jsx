"use client";
import Image from "next/image";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
//Components Import
import { SendMessage } from "./Buttons";
import AddFriend from "./AddFriend";
import { useUserId } from "./GetCurrentUser";
export default function ProfilePageContainer({ username }) {
  const [userData, setUserData] = useState(null);
  const [friendshipExists, setFriendshipExists] = useState(null);
  const { currentUser } = useUserId();
  const currentUserId = currentUser?.id;

  useEffect(() => {
    console.log(`curr user`, currentUserId);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/${username}`);
        const friendshipRes = await axios.get(`/api/friendships/${currentUserId}`);
        const friendsData = friendshipRes.data.filter((friend) => friend.status === "friends");
        const ifFriendshipExists = friendsData?.find(
          (friendship) =>
            (friendship.requestorId === currentUserId &&
              friendship.receiverId === response.data.id) ||
            (friendship.requestorId === response.data.id && friendship.receiverId === currentUserId)
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
      {friendshipExists && <SendMessage />}
    </div>
  );
}
