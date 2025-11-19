// src/db/models/BookingTroop.js
module.exports = (sequelize) => {
    const { DataTypes } = require("sequelize");

    return sequelize.define(
        "booking_troops",
        {
            booking_id: { type: DataTypes.INTEGER, allowNull: false },
            troop_id: { type: DataTypes.INTEGER, allowNull: false }
        },
        {
            timestamps: true,
            paranoid: true
        }
    );
};