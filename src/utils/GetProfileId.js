"use client";
import { useRouter } from "next/navigation";
import { useUserId } from "@/components/GetCurrentUser";

const GetProfileId = () => {
  const { currentUser } = useUserId();
  const router = useRouter();
  const profileId = router.query;
  return <div>profile ID: {profileId}</div>;
};

export default GetProfileId;
