// src/db/index.js
const sequelize = require("./config");
const bcrypt = require("bcrypt");

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

const User = require("./models/User")(sequelize);
const Role = require("./models/Role")(sequelize);
const UserRole = require("./models/UserRole")(sequelize);

User.belongsToMany(Role, { through: UserRole, foreignKey: "user_id", otherKey: "role_id" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "role_id", otherKey: "user_id" });

const Activity = require("./models/Activity")(sequelize);
const ActivityTag = require("./models/ActivityTag")(sequelize);
const ActivityCategory = require("./models/ActivityCategory")(sequelize);

Activity.belongsTo(ActivityTag, { foreignKey: "tag_id" });
ActivityTag.hasMany(Activity, { foreignKey: "tag_id" });

Activity.belongsTo(ActivityCategory, { foreignKey: "category_id" });
ActivityCategory.hasMany(Activity, { foreignKey: "category_id" });

const ProgramDay = require("./models/ProgramDay")(sequelize);

const Booking = require("./models/Booking")(sequelize);
const BookingStatus = require("./models/BookingStatus")(sequelize);

Booking.belongsTo(BookingStatus, { foreignKey: "status_id" });
BookingStatus.hasMany(Booking, { foreignKey: "status_id" });

Booking.belongsTo(Group, { foreignKey: "group_id" });
Group.hasMany(Booking, { foreignKey: "group_id" })

Booking.belongsTo(Activity, { foreignKey: "activity_id" });
Activity.hasMany(Booking, { foreignKey: "activity_id" })

const BookingTroop = require("./models/BookingTroop")(sequelize);
Booking.belongsToMany(Troop, { through: BookingTroop, foreignKey: "booking_id", otherKey: "troop_id" });
Troop.belongsToMany(Booking, { through: BookingTroop, foreignKey: "troop_id", otherKey: "booking_id" });






async function initDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Database connected.");

        await sequelize.sync();
        console.log("Models synced.");

        await seedAdminUser();
    } catch (err) {
        console.error("DB init error:", err);
    }
}


async function seedAdminUser() {
    const adminUsername = process.env.WEBAPP_ADMIN;
    const adminPassword = process.env.WEBAPP_ADMIN_PASSWORD;

    let adminRole = await Role.findOne({ where: { role: "system-admin" } });
    if (!adminRole) {
        adminRole = await Role.create({
            role: "system-admin",
            description: "Super administrator"
        });
        console.log("Admin role created.");
    }

    let staffRole = await Role.findOne({ where: { role: "staff" } });
    if (!staffRole) {
        staffRole = await Role.create({
            role: "staff",
            description: "Role for staff members"
        });
        console.log("Staff role created.");
    }

    let adminUser = await User.findOne({ where: { username: adminUsername } });
    if (!adminUser) {
        const hash = await bcrypt.hash(adminPassword, 10);
        adminUser = await User.create({
            username: adminUsername,
            displayname: "Administrator",
            password_hash: hash,
            active: true
        });
        console.log("Admin user created.");
    }

    const roles = await adminUser.getRoles();
    if (!roles.some(r => r.role === "system-admin")) {
        await adminUser.addRole(adminRole);
        console.log("Admin role assigned to admin user.");
    }
    if (!roles.some(r => r.role === "staff")) {
        await adminUser.addRole(staffRole);
        console.log("Staff role assigned to admin user.");
    }
}


module.exports = {
    sequelize,
    models: {
        Group, GroupType,
        Troop, TroopLabel,
        User, Role,
        Activity, ActivityTag, ActivityCategory,
        Booking, BookingStatus,
        ProgramDay,

    },
    initDatabase,
};