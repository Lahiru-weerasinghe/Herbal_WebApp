const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let creeditcardSchema = new Schema({
  cardno: {
    type: Number
  },
  expiry_m: {
    type: Number
  },
  expiry_y: {
    type: Number
  },
  cvv: {
    type: Number
  },
}, {
    collection: 'creeditcard'
  })

module.exports = mongoose.model('creeditcard', creeditcardSchema)