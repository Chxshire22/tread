import Notifications from "@/components/Notifications"

export default function page({ params }) {
  return (
    <div>
      <Notifications username={params.username} />
    </div>
  );
}
