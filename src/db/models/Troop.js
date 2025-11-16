// src/db/models/Troop.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Troop = sequelize.define(
        "troop",
        {
            troop_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            troop_name: { type: DataTypes.STRING, allowNull: false },
            arrival_date: { type: DataTypes.DATEONLY },
            departure_date: { type: DataTypes.DATEONLY },
            participants: { type: DataTypes.INTEGER },
            leaders: { type: DataTypes.INTEGER }
        },
        { timestamps: false }
    );

    Troop.associate = (models) => {
        Troop.belongsToMany(models.TroopLabel, {
            through: models.TroopTroopLabel,
            foreignKey: "label",
        });
    };

    return Troop;
};