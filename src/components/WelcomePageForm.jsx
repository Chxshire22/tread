"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { BACKEND_URL } from "@/app/constants";

export const WelcomePageForm = () => {
  //States
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await axios.post(`${BACKEND_URL}/api/user`, {
          email: user.name,
          username: username,
          bio: bio,
        });
      } catch (error) {
        return console.error(error);
      }
    }
    router.push("/");
  };

  return (
    <>
      {user && <p>Hi! {user.name}</p>} <h1> Welcome to Treads!</h1>
      <p>Let's get started by setting up your profile.</p>
      <p>Tell us a little about yourself.</p>
      <p>Don't worry, you can change this later.</p>
      <p>👟</p>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
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

// These are examples of default properties of user from auth0nextjs:

// name
// :
// "bigtrade@gmail.com"
// nickname
// :
// "bigtrade"
// picture
// :
// "https://s.gravatar.com/avatar/fb8d30b85c6a501e4ec9285fcc4202a1?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fbi.png"
// sid
// :
// "70EgPtyvF-XttMg0KYKI3on48d7u0W1i"
// sub
// :
// "auth0|65c1db702a18b1ef030c1f6d"
// updated_at
// :
// "2024-02-28T07:33:24.357Z"
