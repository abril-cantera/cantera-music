const { Model, DataTypes } = require('sequelize');

const CATEGORIES_TABLE = 'categories'

const CategoriesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nameCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}

class Categories extends Model {
  static associate(models) {
    this.hasMany(models.Files, {
      as: 'files',
      foreignKey: 'categoryId'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIES_TABLE,
      modelName: 'Categories',
      timestamps: false
    }
  }
}

module.exports = { CATEGORIES_TABLE, CategoriesSchema, Categories };
