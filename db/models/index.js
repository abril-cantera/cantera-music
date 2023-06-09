const { Categories, CategoriesSchema } = require('./categories.model');
const { Genders, GendersSchema } = require('./genders.model');
const { Files, FilesSchema } = require('./files.model');

function setupModels(sequelize) {
  Categories.init(CategoriesSchema, Categories.config(sequelize));
  Genders.init(GendersSchema, Genders.config(sequelize));
  Files.init(FilesSchema, Files.config(sequelize));

  Categories.associate(sequelize.models);
  Genders.associate(sequelize.models);
  Files.associate(sequelize.models);;
}

module.exports = setupModels;
