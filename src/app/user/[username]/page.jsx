//Components Import
import ProfilePageContainer from "@/components/ProfilePageContainer";
import MainThreads from "@/components/MainThreads";
import { PeopleFill } from "react-bootstrap-icons";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default async function ProfilePage({ params }) {
  return (
    <div>
      <ProfilePageContainer username={params.username} />
      <br />

      <MainThreads username={params.username} />
      <Navbar />
    </div>
  );
}
