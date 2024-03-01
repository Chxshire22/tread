"use client";
import Image from "next/image";
import { Container } from "react-bootstrap";
//Components Import
import { useUserId } from "./GetCurrentUser";
import { AddFriend, SendMessage } from "./Buttons";

export default function ProfilePageContainer() {
  const { currentUser } = useUserId();

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
        <strong>{"@" + currentUser?.username}</strong>
        <AddFriend />
      </div>
      <Container>{currentUser?.bio}</Container>
      <br />
      <SendMessage />
    </div>
  );
}
