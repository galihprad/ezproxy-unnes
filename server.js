const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const puppeteer = require('puppeteer')
const replace = require('absolutify')


const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true)
            const { pathname, query } = parsedUrl
            if (query.url) {
                // await app.render(req, res, '/a', query)
                const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
                //             // const browser = await puppeteer.launch()
                const page = await browser.newPage()
                console.log("AAAAAAA");
                await page.goto(`https://${query.url}`)
                console.log("BBBBBBB");
                let document = await page.evaluate(() => document.documentElement.outerHTML)
                console.log("CCCCCC");
                document = replace(document, `/?url=${query.url.split('/')[0]}`)
                console.log("DDDDDD");
                return res.end(document)
            } else {
                await handle(req, res, parsedUrl)
            }



        } catch (err) {
            console.error('Error occurred handling', req.url, err)
            res.statusCode = 500
            res.end('internal server error')
        }
    })
        .once('error', (err) => {
            console.error(err)
            process.exit(1)
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`)
        })
})



// const express = require('express')
// const puppeteer = require('puppeteer')
// const replace = require('absolutify')

// const app = express()

// app.get('/', async (req, res) => {
//     const { url } = req.query
//     console.log(url)
//     if (!url) {
//         // await page.goto(`/`)
//         // await app.render('')

//         // return res.send('Not url provided')
//     } else {
//         // generate puppeteer screenshot 
//         try {
//             // If headless Chrome is not launching on Debian, use the following line instead
//             const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
//             // const browser = await puppeteer.launch()
//             const page = await browser.newPage()
//             await page.goto(`https://${url}`)

//             let document = await page.evaluate(() => document.documentElement.outerHTML)
//             document = replace(document, `/?url=${url.split('/')[0]}`)

//             return res.send(document)
//         } catch (err) {
//             console.log(err)

//             return res.send(err)
//         }
//     }
// })


// app.listen(8080, () => console.log("proxy is listening on port 8080"))