const express = require('express'),
next = require('next'),
fetch = require("isomorphic-fetch"),
cheerio = require("cheerio")

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
    const server = express()

    //Web scrape most depended upon dependencis
    server.get('/api/getMostUsed', async (req,res) => {
        const response = await (await fetch("https://www.npmjs.com/browse/depended")).text()
        const $ = cheerio.load(response)
        const elements = $(".package-list-item__title___sqwj8")
        res.send(elements.map((i, x) => $(x).text()).get())
    })

    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(3000, (err) => {
    if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})