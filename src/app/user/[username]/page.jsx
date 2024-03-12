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
      <div
        style={{
          marginBottom: "5px",
          width: "30vw",
        }}
      >
        <Link href={`/user/${params.username}/friends`}>
          Friends <PeopleFill />
        </Link>
      </div>
      <h2>My Trips</h2>
      <MainThreads username={params.username} />
      <Navbar />
    </div>
  );
}
