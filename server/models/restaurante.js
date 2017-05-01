let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let Prato = require('./prato');

let RestauranteSchema = Schema({
    nome: String,
    pratos: [{type: Schema.Types.ObjectId, ref: 'Prato'}]
});

RestauranteSchema.pre('remove', function(next) {
    Prato.remove({restaurante: this._id}).exec();
    next();
});


module.exports = mongoose.model('Restaurante', RestauranteSchema);
