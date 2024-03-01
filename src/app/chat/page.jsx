"use client";

import { useEffect, useState } from "react";
import styles from "./chat.module.css";
import ChatroomBlock from "@/components/ChatroomBlock";

export default function Chats() {
  const [chatrooms, setChatrooms] = useState([]);
  const [userId, setUserId] = useState();

  // const { currentUser } = useCurrentUserContext();

  //Retrieves current user
  // useEffect(() => {
  //   setUserId(currentUser.id);
  //   console.log("pic", currentUser.profilePicture);
  // }, [currentUser]);

  // useEffect(() => {
  //   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  // }, []);

  // get current user
  // get find all chat where currentUser is sender
  // get chat with eager loading for listing
  // if listing sellerId == currentUser
  // do css or html to mark that the chatroom block is a room where currentUser.id is sellerId

  //Retrieves existing chatrooms for user, who can be either seller/ buyer
  // const getAllChatrooms = async () => {
  //   console.log("user", currentUser.id);

  //   const chatroomsData = await axios.get(`${BACKEND_URL}/chat/${userId}`);
  //   setChatrooms(chatroomsData.data);
  // };

  // // //When user ID is retrieved, get all chatrooms for specific user
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (userId) {
  //       try {
  //         await getAllChatrooms();
  //       } catch (error) {
  //         // show error if getAllChatrooms() fails
  //         console.error("Error fetching chatrooms:", error);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [userId]);

  //Render either seller or buyer details depending on if user is potential buyer
  //IF user not potentialBuyer, show User
  //Else show Seller information
  // const renderChatroom = (chatrooms) => {
  //   return chatrooms.map((chatroom) => (
  //     <ChatroomBlock
  //       key={chatroom.id}
  //       chatroomId={chatroom.id}
  //       potentialBuyerId={chatroom.potentialBuyerId}
  //       userId={currentUser.id}
  //       username={
  //         chatroom.potentialBuyerId === userId
  //           ? chatroom.listing.seller.username
  //           : chatroom.user.username
  //       }
  //       profileImg={
  //         chatroom.potentialBuyerId === userId
  //           ? chatroom.listing.seller.profilePicture
  //           : chatroom.user.profilePicture
  //       }
  //       name={
  //         chatroom.potentialBuyerId === userId
  //           ? `${chatroom.listing.seller.firstName} ${chatroom.listing.seller.lastName}`
  //           : `${chatroom.user.firstName} ${chatroom.user.lastName}`
  //       }
  //       listing={chatroom.listing.title}
  //     />
  //   ));
  // };

  return (
    <>
      <div className="page-container">
        <header className={styles.header}>
          <img
            className="pfp-sm"
            src="https://i.pinimg.com/564x/d4/74/1c/d4741cb779ddec6509ca1ae0cb137a7d.jpg"
            alt="user profile image"
          />
          <h1 className={styles.headerTitle}>Messages</h1>
        </header>
        <hr />
        <div className="">
          <ChatroomBlock />
        </div>
      </div>
    </>
  );
}
