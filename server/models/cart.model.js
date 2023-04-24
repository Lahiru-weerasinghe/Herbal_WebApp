const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cartSchema = new Schema({
  uid: {
    type: String
  },
  pid: {
    type: String
  },
  qnty: {
    type: Number
  },
}, {
    collection: 'cart'
  })

module.exports = mongoose.model('cart', cartSchema)