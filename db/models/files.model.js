const { Model, DataTypes } = require('sequelize');

const { CATEGORIES_TABLE } = require('./categories.model');
const { GENDERS_TABLE } = require('./genders.model');

const FILES_TABLE = 'files'

const FilesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nameFile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nameAuthor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORIES_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  genderId: {
    field: 'gender_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: GENDERS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Files extends Model {
  static associate(models) {
    //
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: FILES_TABLE,
      modelName: 'Files',
      timestamps: false
    }
  }
}

module.exports = { FILES_TABLE, FilesSchema, Files };