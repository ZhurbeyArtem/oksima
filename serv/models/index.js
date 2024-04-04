import { Category } from "./categories.js";
import { User } from "./user.js";
import { Payout } from "./payout.js";
import { Proposal } from "./proposal.js";

User.hasMany(Proposal)
Proposal.belongsTo(User)

User.hasMany(Payout)
Payout.belongsTo(User)

Category.hasMany(Proposal);
Proposal.belongsTo(Category);




export default { Category, User, Payout, Proposal };
