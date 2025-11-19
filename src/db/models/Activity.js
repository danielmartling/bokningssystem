// src/db/models/Activity.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Activity = sequelize.define(
        "activity",
        {
            activity_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            title: { type: DataTypes.STRING, allowNull: false },
            subtitle: { type: DataTypes.STRING },
            desc_short: { type: DataTypes.STRING },
            desc_guest: { type: DataTypes.STRING },
            desc_staff: { type: DataTypes.STRING },
            material: { type: DataTypes.STRING },
            place: { type: DataTypes.STRING },
            languages: { type: DataTypes.STRING },
        },
        {
            timestamps: true,
            paranoid: true
        }
    );

    Activity.associate = (models) => {
        Activity.belongsTo(models.ActivityCategory, { foreignKey: "category_id" });
        Activity.belongsTo(models.ActivityTag, { foreignKey: "tag_id" });
        Activity.hasMany(models.Booking, { foreignKey: "booking_id" });
    };

    return Activity;
};