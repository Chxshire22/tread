"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const WelcomePageForm = () => {
  //States
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    router.push("/");
  };
  return (
    <>
      <h1>Welcome to Treads!</h1>
      <p>Let's get started by setting up your profile.</p>
      <p>Tell us a little about yourself.</p>
      <p>Don't worry, you can change this later.</p>
      <p>👟</p>
      <br />
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])} />
        <input
          required
          type="string"
          placeholder="What's your username?"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bio (optional)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button type="submit">Complete my profile!</button>
      </form>
    </>
  );
};
