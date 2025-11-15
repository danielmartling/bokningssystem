// src/db/models/Group.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Group = sequelize.define(
        "Group",
        {
            group_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            group_name: { type: DataTypes.STRING, allowNull: false },
            booking_number: { type: DataTypes.INTEGER, allowNull: false, unique: true },
            arrival_date: { type: DataTypes.DATEONLY, allowNull: false },
            departure_date: { type: DataTypes.DATEONLY, allowNull: false }
        },
        { timestamps: false }
    );

    Group.associate = (models) => {
        Group.belongsToMany(models.GroupType, {
            through: models.GroupGroupType,
            foreignKey: "group_id",
        });
    };

    return Group;
};