import * as express from "express"
import * as bodyParser from "body-parser"
import { AppDataSource } from "./data-source"
const cors = require("cors");
const corsOptions = require('./config/corsOptions')
const errorHandler = require('./middleware/errorHandler')
require('dotenv').config()
const cookieParser = require('cookie-parser')

AppDataSource.initialize().then(async () => {

    const app = express()
    app.use(bodyParser.json())
    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(cookieParser())
    app.use('/auth', require('./routes/authRouter'));
    app.use('/refresh', require('./routes/refreshTokenRoute'));
    app.use(errorHandler)

    app.listen(3000)
    console.log("Express server has started on port 3000. Open http://localhost:3000/ to see results")

}).catch(error => console.log(error))
