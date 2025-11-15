// src/db/models/TroopLabel.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const TroopLabel = sequelize.define(
        "TroopLabel",
        {
            label: { type: DataTypes.STRING },
            description: { type: DataTypes.STRING }
        },
        { timestamps: false }
    );

    TroopLabel.associate = (models) => {
        TroopLabel.belongsToMany(models.Troop, {
            through: models.TroopTroopLabel,
            foreignKey: "troop_id",
        });
    };

    return TroopLabel;
};