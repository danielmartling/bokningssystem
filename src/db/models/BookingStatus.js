// src/db/models/BookingStatus.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const BookingStatus = sequelize.define(
        "booking_status",
        {
            status_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            status: { type: DataTypes.STRING, allowNull: false }
        },
        {
            timestamps: true,
            paranoid: true
        }
    );

    BookingStatus.associate = (models) => {
        BookingStatus.hasMany(models.Booking, { foreignKey: "booking_id" });
    };

    return BookingStatus;
};