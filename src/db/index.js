// src/db/index.js
const sequelize = require("./config");

// Importera models:
const Group = require("./models/Group")(sequelize);
const GroupType = require("./models/GroupType")(sequelize);
const GroupGroupType = require("./models/GroupGroupType")(sequelize);

const models = {
    Group, GroupType, GroupGroupType
};

Group.associate(models);
GroupType.associate(models);

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
    models,
    initDatabase,
};