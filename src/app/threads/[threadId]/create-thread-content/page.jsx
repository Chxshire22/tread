import CreateThreadContentForm from "@/components/CreateThreadContentForm";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";


export default function CreateThreadContent({params}) {

  const { threadId } = params;

  return (
    <div className="page-container">
      <PageHeaderWithBackBtn title="Create Thread Content" />

      <CreateThreadContentForm threadId={threadId} />
      
    </div>
  );
}