"use client";
import Image from "next/image";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
//Components Import
import AddFriend from "./AddFriend";
import { useUserId } from "./GetCurrentUser";
import { useRouter } from "next/navigation";
import { PeopleFill } from "react-bootstrap-icons";
import Link from "next/link";

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

  const userDp =
    userData?.userDpUrl ||
    "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

  return (
    <div className="profilepage-main">
      {" "}
      <div className="profilepage-head">
        <Image
          src={userDp}
          alt="placeholder img"
          className="pfp-l"
          width={100}
          height={100}
        />

        <p className="profilepage-username">{"@" + userData?.username}</p>
      </div>
      <Container className="profilepage-bio">
        <strong> " </strong>
        {userData?.bio}
        <strong> "</strong>
      </Container>
      <br />
      <div className="profilepage-friends-message">
        <AddFriend userData={userData} />
        {friendshipExists && (
          <button className="btn btn-info" onClick={handleStartChat}>
            Send Message
          </button>
        )}
      </div>
      <br />
      <Link
        className="profilepage-friends btn btn-outline-primary"
        href={`/user/${username}/friends`}
      >
        See all friends{" "}
        <span style={{ marginLeft: "10px" }}>
          <PeopleFill size={25} />
        </span>
      </Link>
    </div>
  );
}
