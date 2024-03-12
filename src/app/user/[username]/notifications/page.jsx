import Notifications from "@/components/Notifications";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";
import Navbar from "@/components/Navbar";

export default function page({ params }) {
  return (
    <>
      <div className="page-container">
        <PageHeaderWithBackBtn title={"Notifications"} />
        <Notifications username={params.username} />
      </div>
      <Navbar />
    </>
  );
}
