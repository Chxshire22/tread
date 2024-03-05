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
User.hasMany(Message);
User.hasMany(Friendship, {
  as: "Requestor",
  foreignKey: "requestorId",
});
User.hasMany(Friendship, {
  as: "Receiver",
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
Threads_Content.hasMany(Threads_Contents_Comment, { foreignKey: "threadsContentsId" });
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
Threads_Contents_Comment.belongsTo(Threads_Content, { foreignKey: "threadsContentsId" });

//Threads_Contents_Display_Picture
Threads_Contents_Display_Picture.belongsTo(Threads_Content);

//Threads_Contents_Like
Threads_Contents_Like.belongsTo(User);
Threads_Contents_Like.belongsTo(Threads_Content);


module.exports = { User, Thread, Threads_Content, Threads_Contents_Category, Threads_Contents_Comment, Threads_Contents_Display_Picture, Threads_Contents_Like };
