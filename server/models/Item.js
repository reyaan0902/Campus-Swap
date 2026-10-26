const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ['Textbooks', 'Calculators', 'Lab Coats', 'Stationery', 'Electronics', 'Other'],
      default: 'Other',
    },
    condition: { type: String, enum: ['New', 'Like New', 'Good', 'Fair'], default: 'Good' },
    image: { type: String, default: '' },
    status: { type: String, enum: ['available', 'sold'], default: 'available' },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
