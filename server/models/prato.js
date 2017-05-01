let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let PratoSchema = Schema({
    nome: String,
    valor: Number,
    restaurante: {type: Schema.Types.ObjectId, ref: 'Restaurante'}
});

module.exports = mongoose.model('Prato', PratoSchema);
