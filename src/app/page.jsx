"use client";
//Components Import
import { LoginButton, SignUpButton, CreatePostButton } from "@/components/Buttons";
import { useUserId } from "@/components/GetCurrentUser";
import HomePageThreads from "@/components/HomePageThreads";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import AirThreadwhitecrop from "@/assets/AirThreadwhitecrop.png";

export default function Home() {
  const { currentUser } = useUserId();

  return (
    <main>
      <div>
        <div className="airthread-logo">
          <Image src={AirThreadwhitecrop} alt="AirThread Logo" width={300} height={200} />
        </div>
        {currentUser?.email && (
          <p className="main-username">
            Hello 👋
            <strong className="profilepage-username">{currentUser.username} </strong>
          </p>
        )}
      </div>

      {!currentUser && (
        <div className="mainpage-btns">
          <LoginButton />
          <br />
          <SignUpButton />
        </div>
      )}
      <HomePageThreads />
      <CreatePostButton />
      <Navbar />
    </main>
  );
}
