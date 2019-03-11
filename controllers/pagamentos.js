    module.exports = function (app) {
    app.get('/pagamentos', function (req, res) {
        console.log("Recebida requisição de teste na porta 3000.");
        res.send('Ok'); 

    });

    app.delete('/pagamentos/pagamento/:id', function(req, res){
        pagamento = {};
        var id  = req.params.id;
        
        pagamento.id = id;
        pagamento.status = 'CANCELADO';

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.atualiza(pagamento, function(erro){
            if (erro){
                res.send(500).send(erro);
                return
            }
            console.log('PAGAMENTO CANCELADO')
            res.status(204).send(pagamento);

        });

    });
    
    app.put('/pagamentos/pagamento/:id', function(req,res) {

        pagamento = {};
        var id  = req.params.id;
        
        pagamento.id = id;
        pagamento.status = 'CONFIRMADO';

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.atualiza(pagamento, function(erro){
            if (erro){
                res.send(500).send(erro);
                return
            }
            console.log('PAGAMENTO CRIADO')
            res.send(pagamento);

        });
    });

    //Rota para requisição
    app.post('/pagamentos/pagamento', function(req,res){

        req.assert("forma_de_pagamento", "Forma de pagamento eh obrigatoria." ).notEmpty();
        req.assert("valor", "Valor é obrigatorio e deve ser decimal.").notEmpty().isFloat;

        var erros = req.validationErrors();

        if(erros){
            console.log("Erros de validacao encontrados");
            req.status(400).send(400);
            return;

        }
 
        //Pegar o corpo da requisição e salvar na variável pagamento       
        var pagamento = req.body;
        
        console.log('Processando uma requisição de um novo pagamento..');
        
        pagamento.status = 'CRIADO';
        pagamento.date = new Date;
        
        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.salva(pagamento, function(erro, resultado){
            if(erro){
                console.log('Erro ao inserir no banco:' + erro);
                res.status(500).send(erro);
            } else {
                console.log('Pagamento criado.');
                res.location('/pagamentos/pagamento/' + resultado.insertId);

                res.status(201).json(pagamento);
            } 
        });

            

        
        
        

        


        
    });


}

