import http from "http";
const pid = process.pid;

// implement worker for cluster

http.createServer((req, res) => {
    res.end('Hello from Node.js \n')
}).listen(8080, () => {
    console.log(`Server started. Pid: ${pid}`);
});