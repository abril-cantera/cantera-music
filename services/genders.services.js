const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class GendersServices {
  // Create new gender
  async create(data) {
    const newGenders = await models.Genders.create({
      ...data,
    })
    return newGenders;
  }

  // Find all genders
  async find() {
    const genders = await models.Genders.findAll();
    return genders;
  }

  // Find gender by ID
  async findOne(id) {
    const gender = await models.Genders.findByPk(id, {
      include: ['files']
    })
    return gender;
  }

  async update(id, changes) {
    const gender = await this.findOne(id);
    const rta = await gender.update(changes);
    return rta;
  }

  // Delete gender by ID
  // ATTENTION
  async delete(id) {
    const gender = await this.findOne(id);
    await gender.destroy();
    return { id };
  }
}

module.exports = GendersServices;