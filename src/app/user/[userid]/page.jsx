import { BACKEND_URL } from "@/app/constants";
import { AddFriend } from "@/components/Buttons";
//Components Import
import ProfilePageContainer from "@/components/ProfilePageContainer";
import GetProfileId from "@/utils/GetProfileId";

async function getUsername(userid) {
  const response = await fetch(`${BACKEND_URL}/api/user/${userid}`);
  return response.json();
}

export default async function ProfilePage({ params }) {
  return (
    <div>
      <ProfilePageContainer />
      <br />
      <h2>My Trips</h2>
      {/* TESTING - TO BE REMOVED  */}
      <AddFriend />
      <GetProfileId />
    </div>
  );
}
