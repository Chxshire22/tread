import User from "./User";
import Thread from "./Thread"

User.hasMany(Thread, { foreignKey: "userId" });
Thread.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Thread };
