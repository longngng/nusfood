const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: mongoose.Decimal128,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('dish', DishSchema);
