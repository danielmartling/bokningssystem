// src/db/models/ActivityTag.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const ActivityTag = sequelize.define(
        "activity_tag",
        {
            tag_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            tag: { type: DataTypes.STRING, allowNull: false }
        },
        {
            timestamps: true,
            paranoid: true
        }
    );

    ActivityTag.associate = (models) => {
        ActivityTag.hasMany(models.Activity, { foreignKey: "activity_id" });
    };

    return ActivityTag;
};