//Components Import
import ProfilePageContainer from "@/components/ProfilePageContainer";
import MainThreads from "@/components/MainThreads";

export default async function ProfilePage({ params }) {
  return (
    <div>
      <ProfilePageContainer username={params.username} />
      <br />
      <h2>My Trips</h2>
      <MainThreads username={params.username} />
    </div>
  );
}
