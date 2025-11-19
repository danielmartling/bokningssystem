// src/db/models/ActivityCategory.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const ActivityCategory = sequelize.define(
        "activity_category",
        {
            category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING, allowNull: false },
            order: { type: DataTypes.INTEGER },
        },
        {
            timestamps: true,
            paranoid: true
        }
    );

    ActivityCategory.associate = (models) => {
        ActivityCategory.hasMany(models.Activity, { foreignKey: "activity_id" });
    };

    return ActivityCategory;
};