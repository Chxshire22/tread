import Notifications from "@/components/Notifications";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";

export default function page({ params }) {
  return (
    <div>
      <PageHeaderWithBackBtn title={"Notifications"} />
      <Notifications username={params.username} />
    </div>
  );
}
