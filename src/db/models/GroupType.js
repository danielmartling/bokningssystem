// src/db/models/GroupType.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const GroupType = sequelize.define(
        "group_type",
        { name: { type: DataTypes.STRING, allowNull: false } },
        { timestamps: false });

    GroupType.associate = (models) => {
        GroupType.belongsToMany(models.Group, {
            through: models.GroupGroupType,
            foreignKey: "type_id",
        });
    };

    return GroupType;
};