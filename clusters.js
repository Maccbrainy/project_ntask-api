const cluster = require("cluster");
const os = require("os");

const CPUS = os.cpus();
if (cluster.isMaster) {
    CPUS.forEach(() => cluster.fork());
    cluster.on("listening", worker => {
        console.log("Cluster is connected:", worker.process.pid);
    });
    cluster.on("disconnect", worker => {
        console.log("Cluster is disconnected", worker.process.pid);
    });
    cluster.on("exit", worker => {
        console.log("Cluster is dead", worker.process.pid);
        cluster.fork()
        //Ensure starts of a new cluster if an old one dies
    });
} else {
    require("./index.js");
}