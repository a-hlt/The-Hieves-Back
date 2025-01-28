import express from 'express'
import cors from 'cors'
import * as OpenApiValidator from 'express-openapi-validator'
import * as url from 'url'
import path from 'path'
import 'dotenv/config'

import UserRouter from './routes/usersRouter.js'
import {errorHandler} from './middlewares/errorHandler.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(OpenApiValidator.middleware({
    apiSpec: __dirname + '/openapi-main.yaml',
    ignoreUndocumented: true,
}))

app.use('/api', UserRouter);

app.use(errorHandler);

export default app