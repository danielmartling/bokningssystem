// src/db/models/TroopLabel.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const TroopLabel = sequelize.define(
        "troop_label",
        {
            label: { type: DataTypes.STRING },
            description: { type: DataTypes.STRING }
        },
        { timestamps: false }
    );

    TroopLabel.associate = (models) => {
        TroopLabel.hasMany(models.Troop, { foreignKey: "label_id" });
    };

    return TroopLabel;
};