const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const fileUpload = require('express-fileupload');


const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 5000;

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads'
}));


app.use(express.json());


app.use(cors());

routerApi(app)

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Mi port ${port}`);
})