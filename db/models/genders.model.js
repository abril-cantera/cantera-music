const { Model, DataTypes } = require('sequelize');

const GENDERS_TABLE = 'genders'

const GendersSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nameGender: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}

class Genders extends Model {
  static associate(models) {
    this.hasMany(models.Files, {
      as: 'files',
      foreignKey: 'genderId'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: GENDERS_TABLE,
      modelName: 'Genders',
      timestamps: false
    }
  }
}

module.exports = { GENDERS_TABLE, GendersSchema, Genders };   