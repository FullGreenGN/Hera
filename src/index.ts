import express, { Request, Response } from 'express'
import connect from './db'
import path from 'node:path'
import morgan from 'morgan'
import * as socketio from "socket.io";
import bodyParser from 'body-parser'
import router from './routes'
import { getPages } from './services/pages.service'
import variables from './config'
import { PrismaClient } from './generated/client'
import { createDefaultSettings } from './services/settings.service'
import logger from './lib/logger'
import * as http from 'http'

const app = express()
const port = variables.PORT || 3000
const prisma = new PrismaClient()

const server = http.createServer(app);
const io = new socketio.Server(server);

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../public/css')))
app.use(express.static(path.join(__dirname, '../public/uploads')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
        stream: {
            // Configure Morgan to use our custom logger with the http severity
            write: (message) => logger.info(message.trim()),
        },
    }
);

app.use(morganMiddleware);

app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

app.use('', router)

io.on("connection", (socket) => {
    // console.log('a user connected');

    socket.on("disconnect", () => {
        //  console.log('user disconnected');
    });
});

function socketProgressEmit(event: any, state: any, fileName: any, i: any) {
    io.emit(event, { state: state, fileName: fileName, id: i });
}

function socketDownloadEmit(event: any, action: any, message: any, fileName: any, i: any) {
    io.emit(event, {
        action: action,
        message: message,
        fileName: fileName,
        id: i,
    });
}

function socketBroadcast(message: any, type: any) {
    io.emit("message", { msg: message, type: type });
}

server.listen(port, () => {
    logger.debug(`Server running at http://localhost:${port}`)
})

connect()
    .then(() => {
        logger.log('info', 'Database connected')
        prisma.settings.findMany().then((settings) => {
            if (settings.length === 0) {
                createDefaultSettings().then(() => {
                    logger.log('info', 'Default settings created')
                }).catch((e) => {
                    logger.log('error', e)
                    process.exit(1)
                })
            }
        })
    })
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })

export { socketProgressEmit, socketDownloadEmit, socketBroadcast }
