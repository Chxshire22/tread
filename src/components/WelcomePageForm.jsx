"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { imgOptimization } from "@/utils/imageOptimization";
import { BACKEND_URL } from "@/app/constants";
import {
  ref as storageRef,
  getDownloadURL,
  uploadString,
} from "@firebase/storage";

import { storage, DB_STORAGE_PFP_KEY, DEFAULT_PFP } from "@/utils/firebase";

export const WelcomePageForm = () => {
  //States
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [preview, setPreview] = useState(DEFAULT_PFP);

  const { user } = useUser();
  const router = useRouter();

  const handleImageChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setPreview(null);
      return;
    }
    const file = e.target.files[0];

    let optimizedImg = await imgOptimization(file, 768);
    console.log(optimizedImg);
    setPreview(optimizedImg);
  };

  // TODO: Check if username is already taken return error message
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sendUserData = await axios.post(`${BACKEND_URL}api/user`, {
        email: user.name,
        username: username,
        bio: bio,
        userDpUrl: DEFAULT_PFP,
      });
      if (preview === DEFAULT_PFP) {
        router.push("/");
        return;
      } else {
        const storageRefInstance = storageRef(
          storage,
          DB_STORAGE_PFP_KEY + sendUserData.data.username
        );
        await uploadString(storageRefInstance, preview, "data_url");
        const imageSrc = preview
          ? await getDownloadURL(storageRefInstance)
          : null;
        await axios.put(`${BACKEND_URL}api/user`, {
          id: sendUserData.data.id,
          userDpUrl: imageSrc,
        });
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-container">
      <h1> Welcome to Treads!</h1>
      <p>Let&apos;s get started by setting up your profile.</p>
      <p>Tell us a little about yourself.</p>
      {/* <p>Don&apos;t worry, you can change this later.</p> */}
      {/* <p>👟</p> */}
      <br />
      <form onSubmit={handleSubmit} className="welcome-form">
        <div>
          <img src={preview} alt="" className="pfp-lg" />
        </div>
        <input
          type="file"
          accept="image/*"
          // value={profileImage}
          onChange={handleImageChange}
        />
        <div className="form-floating">
          <input
            required
            type="string"
            placeholder="Username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="form-label">Username</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            placeholder="Bio (optional)"
            value={bio}
            className="form-control"
            onChange={(e) => setBio(e.target.value)}
          />
          <label htmlFor="">Bio</label>
        </div>
        <button
          className="btn btn-submit-form"
          type="submit"
          disabled={username == "" ? true : false}
        >
          Complete my profile!
        </button>
      </form>
    </div>
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
