const path = require("path")

const http = require('http')
const express = require('express')
const app = express()

const fetch = require('node-fetch')


// Access Origin
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", '*')
    res.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")    
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    next()
})
app.disable('x-powered-by')

// Public Static File Folder
let public_folder = path.join(__dirname, '..', '/public/')
app.use(express.static(public_folder))

const server = http.createServer(app)

// Enviroment Data
const dotenv = require('dotenv')
dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT || 5400

/**
 * ------------------------------
 * API Routes
 * ------------------------------
 */

// Dasboard HTML Page
app.get("/", async (req, res) => {    
    res.setHeader('Content-Type', 'text/html')
    res.status(200).sendFile(`index.html`)
})

// Return some data
app.get("/sh/:user", async (req, res) => {

    let user = req.params.user
    user = user.replace(/[^a-z0-9]/gi,'') // Only alphanumeric string

    if (!user) {
        res.setHeader('Content-Type', 'text/html')
        res.status(500).send("No GitHub User")

    } else {

        console.log("Keys for GitHub User :", user)

        res.setHeader('Content-Type', 'application/x-sh')
    
        const sh_script_url = ' https://raw.githubusercontent.com/kori2000/shell-script-helper/main/getkeys.sh'
    
        let response = await fetch(sh_script_url)
        let body = await response.text()
        let modded_script = body.replace("kori2000", user)
    
        res.status(200).send(modded_script)

    }
})

/**
 * ------------------------------
 * Server Settings
 * ------------------------------
 */
 server.listen(SERVER_PORT, () => {
    console.log("-------------------------------")
    console.log("  API started")
    console.log("----------------+--------------")
    console.log(`| SERVER PORT...:`, SERVER_PORT)
    console.log("----------------+--------------\n")
})