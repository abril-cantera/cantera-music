const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

// S3 ###########################
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { config } = require('../config/config');

// connection aws
const client = new S3Client({
  region: config.bucketRegion,
  credentials: {
    accessKeyId: config.publicKey,
    secretAccessKey: config.secretKey,
  }
})

class FilesServices {

  // DB ###########################
  // crear funcion que permita subir archivos y obtener url
  async cargarFile(file) {
    const contenidoArchivo = fs.readFileSync(file.tempFilePath);
    // parametros
    const uploadParams = {
      Bucket: config.bucketName,
      Key: file.name,
      Body: contenidoArchivo
    }
    await client.send(new PutObjectCommand(uploadParams))

    // Obtener la ubicación del archivo
    const headParams = {
      Bucket: config.bucketName,
      Key: file.name
    };
    const command = new GetObjectCommand(headParams)
    const url = await getSignedUrl(client, command)
    const urlObj = new URL(url);
    return urlObj.protocol + "//" + urlObj.host + urlObj.pathname;
  };

  // Prueba Create DB
  async create(data) {
    const nameFile = await models.Files.findOne({
      where: {
        nameFile: data.nameFile
      }
    });
    const nameAuthor = await models.Files.findOne({
      where: {
        nameAuthor: data.nameAuthor
      }
    });

    if (nameFile && nameAuthor) {
      throw boom.badGateway('The file already exists')
    } else {
      const newFiles = await models.Files.create({
        ...data,
      })
      return newFiles;
    }
  }

  // Find all files
  async find() {
    const files = await models.Files.findAll();
    return files;
  }

  // Find file by ID
  async findOne(id) {
    const file = await models.Files.findByPk(id);
    return file;
  }

  async update(id, changes) {
    const file = await this.findOne(id);
    const rta = await file.update(changes);
    return rta;
  }

  // Delete file by ID
  async delete(id) {
    const file = await this.findOne(id);
    await file.destroy();
    return { id };
  }
}

module.exports = FilesServices;
