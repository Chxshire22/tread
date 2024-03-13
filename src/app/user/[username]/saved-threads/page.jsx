import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";
import Navbar from "@/components/Navbar";
import SavedThreads from "@/components/SavedThreads";

export default function page({ params }) {
  return (
    <>
      <div className="page-container">
        <PageHeaderWithBackBtn title={"Saved Threads"} />
        <SavedThreads username={params.username}/>
      </div>
      <Navbar />
    </>
  );
}
