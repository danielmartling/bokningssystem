// src/db/models/Troop.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Troop = sequelize.define(
        "troop",
        {
            troop_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING, allowNull: false },
            arrival_date: { type: DataTypes.DATEONLY },
            departure_date: { type: DataTypes.DATEONLY },
            participants: { type: DataTypes.INTEGER },
            leaders: { type: DataTypes.INTEGER }
        },
        {
            timestamps: true,
            paranoid: true
        }
    );

    Troop.associate = (models) => {
        Troop.belongsTo(models.TroopLabel, { foreignKey: "label_id" });
        Troop.belongsTo(models.Group, { foreignKey: "group_id" });
        Troop.belongsToMany(models.Booking, {
            through: models.BookingTroop,
            foreignKey: "troop_id",
        });
    };

    return Troop;
};