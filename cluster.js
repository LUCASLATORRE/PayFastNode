var cluster = require('cluster');
var os = require('os');
var cpus = os.cpus();

console.log('executando thread..')

if(cluster.isMaster){
    console.log("Thread master");
    
    cpus.forEach(function(){
        cluster.fork();
    });

    cluster.on('listening', function (worker){
        console.log('cluster conectado ' + worker.process.pid);
    });

    //expressao lambda sendo worker o parâmetro 
    cluster.on('exit', worker => {
        console.log('cluster %d desconectado', worker.process.pid);
        cluster.fork();
    });
    
}else{
    console.log('thread slave');
    require('./index.js');
};




