const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');


const fileUpload = require('express-fileupload');


const { logErrors, ormErrorHandler, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads'
}));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});


routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port' + port);
});
