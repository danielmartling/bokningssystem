// src/db/models/GroupGroupType.js

module.exports = (sequelize) => {
    const GroupGroupType = sequelize.define("GroupGroupType", {}, { timestamps: false });
    return GroupGroupType;
};