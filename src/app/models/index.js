import User from "./User";
import Thread from "./Thread";
import Threads_Content from "./Threads_Content";
import Threads_Contents_Comment from "./Threads_Contents_Comment";
import Threads_Contents_Like from "./Threads_Contents_Like";
import Threads_Contents_Display_Picture from "./Threads_Contents_Display_Picture";
import Notification from "./Notification";
import Message from "./Message";
import Friendship from "./Friendship";
import Category from "./Category";
import Threads_Contents_Category from "./Threads_Contents_Category";
import Saved_Thread from "./Saved_Thread";
import Chatroom from "./Chatroom";

//User associations
User.hasMany(Thread, { foreignKey: "userId" });
User.hasMany(Threads_Contents_Comment, { foreignKey: "userId" });
User.belongsToMany(Threads_Content, {
  through: "Threads_Contents_Like",
});
User.belongsToMany(Thread, {
  through: "Saved_Thread",
});
User.hasMany(Notification);
User.hasMany(Message, { foreignKey: "senderId" });
User.hasMany(Friendship, {
  as: "requestor",
  foreignKey: "requestorId",
});
User.hasMany(Friendship, {
  as: "receiver",
  foreignKey: "receiverId",
});

//Thread associations
Thread.belongsTo(User, { foreignKey: "userId" });
Thread.hasMany(Threads_Content);
Thread.belongsToMany(User, {
  through: "Saved_Thread",
});

//Thread_Content associations
Threads_Content.belongsTo(Thread);
Threads_Content.hasMany(Threads_Contents_Comment, {
  foreignKey: "threadsContentsId",
});
Threads_Content.belongsToMany(User, {
  through: "Threads_Contents_Like",
});
Threads_Content.hasMany(Threads_Contents_Display_Picture);
Threads_Content.belongsToMany(Category, {
  through: "Threads_Contents_Category",
});

//Threads_Content_Category
Threads_Contents_Category.belongsTo(Category);
Threads_Contents_Category.belongsTo(Threads_Content);

//Threads_Contents_Comment
Threads_Contents_Comment.belongsTo(User, { foreignKey: "userId" });
Threads_Contents_Comment.belongsTo(Threads_Content, {
  foreignKey: "threadsContentsId",
});

//Threads_Contents_Display_Picture
Threads_Contents_Display_Picture.belongsTo(Threads_Content);

//Threads_Contents_Like
Threads_Contents_Like.belongsTo(User);
Threads_Contents_Like.belongsTo(Threads_Content);

//Saved_thread
Saved_Thread.belongsTo(User);
Saved_Thread.belongsTo(Thread);

//Notification
Notification.belongsTo(User);

//Message
Message.belongsTo(Chatroom, { foreignKey: "chatroomId" });
Message.belongsTo(User, { foreignKey: "senderId" });

//Chatroom
Chatroom.belongsTo(Friendship, { foreignKey: "friendshipId" });
Chatroom.hasMany(Message, { foreignKey: "chatroomId" });

//Friendship
Friendship.hasOne(Chatroom, { foreignKey: "friendshipId" });
Friendship.belongsTo(User, {
  as: "Requestor",
  foreignKey: "requestorId",
});
Friendship.belongsTo(User, {
  as: "Receiver",
  foreignKey: "receiverId",
});

//Category
Category.belongsToMany(Threads_Content, {
  through: "Threads_Contents_Category",
});

module.exports = {
  User,
  Thread,
  Threads_Content,
  Threads_Contents_Category,
  Threads_Contents_Comment,
  Threads_Contents_Display_Picture,
  Threads_Contents_Like,
  Saved_Thread,
  Notification,
  Message,
  Chatroom,
  Friendship,
  Category,
};
