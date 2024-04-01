import { Category } from "./categories.js";
import { User } from "./user.js";
import { Payout } from "./payout.js";
import { Proposal } from "./proposal.js";

User.hasMany(Proposal)
Proposal.belongsTo(User)

User.hasMany(Payout)
Payout.belongsTo(User)

Proposal.belongsToMany(Category, {through: 'proposal_category'})
Category.belongsToMany(Proposal, { through: "proposal_category" });



export default { Category, User, Payout, Proposal };
