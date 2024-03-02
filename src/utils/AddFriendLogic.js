//1. check profile viewed is NOT currentUser
//2. check profile viewed is NOT already a friend
//3. check profile viewed is NOT already a friend request sent
//4. check profile viewed is NOT already a friend request received
//5. All else, show Add Friend button
//6. On click, send friend request
//7. Last, display "Friends"

import { useUserId } from "@/components/GetCurrentUser";

export const AddFriendLogic = () => {
  const { currentUser } = useUserId();
  const currentUserId = currentUser?.id;

  return <div>AddFriendLogic</div>;
};
