const express = require('express');
const router = express.Router();

var Restaurante = require('../models/restaurante'); //Mongoose modelo Restaurante
var Prato = require('../models/prato'); //Mongoose modelo Prato

/* GET api*/
router.get('/', (req, res) => {
    res.send('API FUNCIONANDO :) \\o/ (:');
});

/**
 * ROTAS DA API {restaurantes e pratos}{1:N}
 */
router.route('/restaurantes')
    .post((req, res) => {
        let restaurante = new Restaurante();
        restaurante.nome = req.body.nome;

        restaurante.save((err) => {
            if(err)
                res.send(err);
            res.json({message: 'Restaurante Criado.'});
        });

    })
    .get((req, res) => {
        
        Restaurante.find({})
        .populate('pratos')
        .exec((err, pratos) => {
            if (err) return res.send(err);
            res.json(pratos);
        })
    });

router.route('/restaurantes/:restaurante_id')
    .get((req, res) => {
        Restaurante.findById(req.params.restaurante_id, function(err, restaurante) {
            if(err)
                res.send(err);
            res.json(restaurante);
        });
    })
    .put((req, res) => {

        let updateRestaurante = {
            nome: req.body.nome
        }

        Restaurante.findOneAndUpdate(req.params._id, updateRestaurante, {new: true}, (err, restaurante) => {
            if(err) res.send(err);
            res.json({mensagem: "Restaurante atualizado."});
        });
    })
    .delete((req, res) => {
        Restaurante.findOne({_id: req.params.restaurante_id}, (err, restaurante) => {
            if(err)
                res.send(err);
            restaurante.remove();
            
            res.json({mensagem: 'Deletado com sucesso!'});
        });
    });

router.route('/pratos')
    .post((req, res) => {
        Restaurante.findOne({_id:req.body.restaurante})
            .exec(function(err, restaurante){

                console.log(restaurante);
                if(err) return res.send(err);
        
                let prato = new Prato();
                prato.nome = req.body.nome;
                prato.valor = req.body.valor;
                prato.restaurante = req.body.restaurante;
                
                prato.save(function(err){
                    restaurante.pratos.push(prato);
                    restaurante.save(function(err){
                    if(err)
                        res.send(err);
                    res.json({mensagem: 'Prato Cadastrado.'});
                    });
                });
            });
        })
    .get((req, res) => {

        Prato.find({})
        .populate('restaurante')
        .sort('restaurante')
        .exec((err, restaurante) =>{
            if(err) return res.send(err);
            res.json(restaurante);
        });
    });

router.route('/pratos/:prato_id')
    .get((req, res) => {
        Prato.findById(req.params.prato_id, (err, prato) => {
            if(err) res.send(err);
            res.json(prato);
        })
    })
    .put((req, res) => {

        let updatePrato = {
            nome: req.body.nome, 
            valor: req.body.valor, 
            restaurante: req.body.restaurante
        }

        Prato.findOneAndUpdate({_id: req.params.prato_id},updatePrato, {new: true}, (err, prato) => {
            if(err) res.send(err);
            res.json({mensagem: "Prato atualizado."});
        });
    })
    .delete((req, res) => {
        Prato.findOne({_id: req.params.prato_id}, function(err, prato) {
            if(err){
                return;
            }
            prato.remove(function (err){
                if(err){
                    res.send(err);
                }
                res.json({mensagem:'Deletado'});
            });
        });
    });

module.exports = router;