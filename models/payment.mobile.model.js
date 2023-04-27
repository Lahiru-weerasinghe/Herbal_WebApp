const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mobileSchema = new Schema({
  mobileno: {
    type: String
  },
  secreatcode: {
    type: String
  },
}, {
    collection: 'mobilepayment'
  })

module.exports = mongoose.model('mobilepayment', mobileSchema)