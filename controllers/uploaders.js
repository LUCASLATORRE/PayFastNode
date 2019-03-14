var fs = require('fs')

module.exports = function(app){
    
    app.post('/upload/imagem', function(req,res){
        
        var filename = req.headers.filename;
        console.log('Recebendo imagem' + filename)
        
        req.pipe(fs.createWriteStream('files/' + filename))
            .on('finish', function(){
                console.log('Arquivo escrito');
                res.status(201).send('Ok')
            });

        
    })
}


