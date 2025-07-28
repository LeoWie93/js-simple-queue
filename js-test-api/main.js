import http from "node:http"

/** @type {string} */
const host = "localhost"
/** @type {number} */
const port = 7070

/** @type {number[]} */
//const waitTimes = [100, 200, 300, 400, 500, 600, 700, 1000, 2000, 3000, 4000, 5000, 6000];
const waitTimes = [1000, 2000];


function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
    * @param {http.IncomingMessage} req 
    * @param {http.OutgoingMessage} res 
*/
async function requestListener(req, res) {
    switch (req.url) {
        case "/true-random-duration":

            const timeout = waitTimes[Math.floor(Math.random() * waitTimes.length)];
            await wait(timeout);
            const message = `Waited for: ${timeout}ms\n`;

            res.statusCode = 200;
            res.setHeader("Contetn-Type", "text/plain");
            res.end(message);
            console.log(message);

            break
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('404 Not Found\n');
    }
}

/** @type {http.Server} */
const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server started on ${host}:${port}`);
});

