//Components Import
import Navbar from "@/components/Navbar";
import ProfilePageContainer from "@/components/ProfilePageContainer";
import MainThreads from "@/components/MainThreads";
import Link from "next/link";

export default async function ProfilePage({ params }) {
  return (
    <div>
      <ProfilePageContainer username={params.username} />
      <br />
      <div
        style={{
          marginBottom: "5px",
          backgroundColor: "lightblue",
          width: "30vw",
        }}
      >
        <Link href={`/user/${params.username}/friends`}>Friends</Link>
      </div>
      <h2>My Trips</h2>
      <MainThreads username={params.username} />
      <Navbar />
    </div>
  );
}
