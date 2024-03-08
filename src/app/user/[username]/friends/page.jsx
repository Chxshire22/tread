import FriendshipsList from "@/components/FriendshipsList";

export default function page({ params }) {
  return (
    <div>
      <FriendshipsList username={params.username}/>
    </div>
  );
}
