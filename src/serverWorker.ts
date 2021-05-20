import http from "http";
const pid = process.pid;

// implement worker for cluster

const server = http.createServer((req, res) => {
    res.end('Hello from Node.js \n')
}).listen(8080, () => {
    console.log(`Server started. Pid: ${pid}`);
});

process.on('SIGINT', () => {
    console.log('Signal recieved is SIGINT');
    // Gracefull shutdown
    server.close(() => {
        process.exit(0)
    });
});

process.on('SIGTERM', () => {
    console.log('Signal recieved is SIGTERM');
    // Gracefull shutdown
    server.close(() => {
        process.exit(0)
    });
});

process.on('SIGUSR2', () => {
    console.log('Signal recieved is SIGUSR2');
    // Gracefull shutdown
    server.close(() => {
        process.exit(1)
    });
});