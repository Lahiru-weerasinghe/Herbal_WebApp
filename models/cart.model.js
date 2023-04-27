const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cartSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  pid: {
    type: String,
    required: true
  },
  qnty: {
    type: Number,
    required: true
  },
}, {
    collection: 'cart'
  })

module.exports = mongoose.model('cart', cartSchema)