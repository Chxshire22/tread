import CreateThreadForm from "@/components/CreateThreadForm";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";


export default function CreateThreadsPage() {

  return (
    <div className="page-container">
      <PageHeaderWithBackBtn title="Create Thread" />

      <CreateThreadForm />
      {/* spacer is needed as navbar is sticky nad will block out the lowest elements on page */}
      <div className="spacer"></div>
    </div>
  );
}
