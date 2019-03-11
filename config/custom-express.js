var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(){
    var app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    //valida a requisição
    app.use(expressValidator());
    
    //gerencia as rotas e dá autorização
    consign()
        .include('controllers')
        .then('persistencia')
        .into(app);
    

    return app;

};

