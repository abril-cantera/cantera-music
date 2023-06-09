### PRIMER PASO

-Iniciar el proyecto: npm init -y => Esto te inicia una configuracion estandar en un archivo .json
-Instalar Express: npm install express => Nos proporciona una forma rápida y sencilla de definir rutas, utilizar middleware, integrar complementos y crear APIs y aplicaciones web eficientes y escalables.
-Instalar node: npm install node => Proporciona un entorno de tiempo de ejecución eficiente y no bloqueante que permite manejar una gran cantidad de solicitudes concurrentes de manera eficiente.

---

-Crear un archivo index.js para colocar la configuracion principal de la conexion del servidor
=> Codigo basico para una conexión

  <!-- 
  const express = require('express')
  const app = express()
  const port = 3000
  app.listen(port, () => {
  console.log(`Mi port ${port}`);
  }) 
-->

-En tu package.json, agrega el script:
"start": "node index.js"
-Para iniciar el servidor: npm start

### SEGUNDO PASO

En este caso usaremos la base de datos de POSTGRES => Esta es una bases de datos relacional => Es relacional ya que en estas se puede hacer consultas SQL y tiene se pueden relacionar las tablas.

-Instalamos Docker: desde la web oficial. Esto nos ayudara a correr el contenedor donde se alojara la base de datos y su configuracion
-Instalamos postgres: npm install postgres => base de datos
-Creamos un archivo docker-compose.yml: en este estara la configuracion de docker
=> Codigo basico para una configuracion:

<!--
version: "3.3"

services:
  postgres:(esta es la base de datos/servicio que se levantara en docker)
    image: postgres:14(esta es la imagen que queremos que corra en el contenedor)
    environment:
      - POSTGRES_DB=nombre de la database
      - POSTGRES_USER=username
      - POSTGRES_PASSWORD=password
    ports:
      - 5432:5432(Este es el puerto en el corre postgres por defecto)
    volumes:(En este volumen es donde se guardara la configuracion de postgres)
      - ./postgres_data:/var/lib/postgresql/data

  pgadmin:(Este servicio es la imagen grafica de nuetra base de datos)
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@mail.com
      - PGADMIN_DEFAULT_PASSWORD=root
    ports:
      - 5050:80(puerto por defecto donde corre pgadmin)
-->

-Una vez hecho el archivo podemos correr los contenedores con los siguientes comandos:
=> docker-compose up -d nombre del servicio => levanta el contenedor del servicio requerido, en este caso para postgres y para pgadmin
=> docker-compose ps se puede ver que servicios estan levantados en ese contenedor
=> docker ps: te muestra los servicios que estan iniciados. En este mismo esta la columna de container id, este nos da un id de cada servicio, si lo copiamos y lo colocamos con el comando docker inspect id=> nos da la informacion de ese servicio.

-Comandos adicionales:
=>docker-compose stop -d: detiene todos los servicios del contenedor
=>docker-compose start -d: inicia todos los servicios del contenedor
=>docker-compose down: elimina el contenedor completo

### TRECER PASO

-Instalamos dotenv: npm install dotenv => Este sirve para la gestion de variables de entorno, nos permite mas flexibilidad a la hora de cambiar algun dato y nos provee mas seguridad para la aplicacion
-Creamos un archivo .env => en este se guardaran las variables de entorno requeridas
-Ejemplo de las variables a crear:

<!-- Tosos estos datos deben ser los mismos que se colocaron en el archivo docker -->
<!--
PORT= puerto en el que correra el servidor
DB_USER= usuario
DB_PASSWORD= constraseña
DB_HOST= El host debe ser donde este corriendo el servidor, en desarrollo corre en local host
DB_NAME= nombre de la base de datos
DB_PORT= puerto donde corre por defecto la base de datos elegida
DATABASE_URL= aqui se crea la url completa con todos estos datos(ej: postgres://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME)
 -->

Este mismo archivo lo llamaremos en un nuevo archivo de config requiriendo dotenv
-Nueva carpeta config => nuevo archivo config.js
ejemplo de contenido:

<!--
require('dotenv').config();


const config = {
  dbUser: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  dbPassword: process.env.DB_PASSWORD,
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
}

module.exports = { config };
 -->
