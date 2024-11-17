const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paystubSchema = new Schema({
  hourlyRate: { type: Number, required: true },
  workedHours: { type: Number, required: true },
  grossPay: { type: String, required: true },
  deductions: {
    provincialTax: { type: String, required: true },
    cpp: { type: String, required: true },
    ei: { type: String, required: true },
  },
  totalDeductions: { type: String, required: true },
  netPay: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Paystub', paystubSchema);
