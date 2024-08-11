const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CanteenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img_link: { type: String },
  campus: { type: String },
  dishes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'dish',
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'review',
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('canteen', CanteenSchema);
