const mongoose = require('mongoose');

const authorRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    contactNumber: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    booksWritten: { type: Number, required: true, min: 0 },
    message: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('AuthorRequest', authorRequestSchema);
