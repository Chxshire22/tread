//Components Import
import ProfilePageContainer from "@/components/ProfilePageContainer";

export default async function ProfilePage({ params }) {
  return (
    <div>
      <ProfilePageContainer username={params.username} />
      <br />
      <h2>My Trips</h2>
      {/* TESTING - TO BE REMOVED  */}
    </div>
  );
}
