// src/db/models/Booking.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Booking = sequelize.define(
        "booking",
        {
            booking_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            start_date: { type: DataTypes.DATEONLY, allowNull: false },
            end_date: { type: DataTypes.DATEONLY },
            start_shift: { type: DataTypes.INTEGER, allowNull: false },
            end_shift: { type: DataTypes.INTEGER },
            start_time: { type: DataTypes.STRING },
            guide: { type: DataTypes.STRING },
            info: { type: DataTypes.STRING },
        },
        {
            timestamps: true,
            paranoid: true
        }
    );

    Booking.associate = (models) => {
        Booking.belongsTo(models.Group, { foreignKey: "group_id" });
        Booking.belongsTo(models.Activity, { foreignKey: "activity_id" });
        Booking.belongsTo(models.BookingStatus, { foreignKey: "status_id" });
        Booking.belongsToMany(models.Troop, {
            through: models.BookingTroop,
            foreignKey: "booking_id",
        });
    };

    return Booking;
};