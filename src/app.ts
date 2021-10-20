import "dotenv/config"
import express from "express";
import {router} from "./routes"
import http from "http";
import {Server} from "socket.io"
import cors from "cors"

const app = express();
app.use(cors())

const serverHTTP = http.createServer(app)

const io = new Server(serverHTTP, {
    cors: {
        origin: "*"
    }
})

io.on("connection", socket => {
    console.log(`usuário conectado no socket ${socket.id}`)
})

app.use(express.json())

app.use(router)



//Rota de login
app.get("/github", (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

//Rota de callback do login
app.get("/signin/callback", (request, response) => {
    const {code} = request.query
    return response.json(code)
})


export {serverHTTP, io}
