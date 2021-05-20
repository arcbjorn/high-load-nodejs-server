import cluster from "cluster";
import { cpus } from "os";
const pid = process.pid;

// implement & configure cluster

if (cluster.isMaster) {
    const cpuCount = cpus().length;
    console.log(`CPUs: ${cpuCount}`);
    console.log(`Master started. Pid: ${pid}`);
    for (let i = 0; i < cpuCount-1; i++) {
        const worker = cluster.fork();
        worker.on('exit', () => {
            console.log(`Worker terminated! Pid: ${worker.process.pid}`)
            cluster.fork();
        });
        worker.send("Hello from server!");
        worker.on('message', (message) => {
            console.log(`Message from worker ${worker.process.pid}: ${JSON.stringify(message)}`)
        });
    }
}

if (cluster.isWorker) {
    require('./serverWorker.js')
    process.on('message', (message) => {
        console.log(`Message from master: ${message}`)
    });
    process.send({ text: 'Hello', pid })
}