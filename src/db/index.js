// src/db/index.js
const sequelize = require("./config");

// Importera models:
const Group = require("./models/Group")(sequelize);
const GroupType = require("./models/GroupType")(sequelize);

const Troop = require("./models/Troop")(sequelize);
const TroopLabel = require("./models/TroopLabel")(sequelize);

Troop.belongsTo(TroopLabel, { foreignKey: "label_id" });
TroopLabel.hasMany(Troop, { foreignKey: "label_id" });

Group.hasMany(Troop, { foreignKey: "group_id" });
Troop.belongsTo(Group, { foreignKey: "group_id" });

const GroupGroupType = require("./models/GroupGroupType")(sequelize);
Group.belongsToMany(GroupType, { through: GroupGroupType, foreignKey: "group_id", otherKey: "type_id" });
GroupType.belongsToMany(Group, { through: GroupGroupType, foreignKey: "type_id", otherKey: "group_id" });

async function initDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Database connected.");

        await sequelize.sync({ alter: true });
        console.log("Models synced.");
    } catch (err) {
        console.error("DB init error:", err);
    }
}

module.exports = {
    sequelize,
    models: {
        Group, GroupType,
        Troop, TroopLabel
    },
    initDatabase,
};