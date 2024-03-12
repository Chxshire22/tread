import ChatroomBlockContainer from "@/components/ChatroomBlockContainer";
import Navbar from "@/components/Navbar";

export default function Chats() {
  return (
    <>
      <div className="page-container">
        <header className="chats-header">
          {/* <img
            className="pfp-sm"
            src="https://i.pinimg.com/564x/d4/74/1c/d4741cb779ddec6509ca1ae0cb137a7d.jpg"
            alt="user profile image"
          /> */}
          <h1 className="">Messages</h1>
        </header>
        <hr />
        <ChatroomBlockContainer />
      </div>
      <Navbar />
    </>
  );
}
