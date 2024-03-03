//Components Import
import ProfilePageContainer from "@/components/ProfilePageContainer";
import { AddFriend } from "@/components/Buttons";
import GetProfileId from "@/components/GetProfileId";

export default async function ProfilePage({ params }) {
  return (
    <div>
      <ProfilePageContainer username={params.username} />
      <br />
      <h2>My Trips</h2>
      {/* TESTING - TO BE REMOVED  */}
      <AddFriend />
      <GetProfileId />
    </div>
  );
}
