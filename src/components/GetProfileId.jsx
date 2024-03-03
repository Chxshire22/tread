"use client";

// Import the necessary modules
import { useRouter } from "next/router";

const GetProfileId = () => {
  const router = useRouter();

  const { username } = router.query;

  return <div>Username: {username}</div>;
};

export default GetProfileId;
