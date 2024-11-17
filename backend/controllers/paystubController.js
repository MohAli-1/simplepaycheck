const HttpError = require('../models/http-error');
const Paystub = require('../models/paystub');

const generatePaystub = async (req, res, next) => {
  const { hourlyRate, workedHours } = req.body;

  if (!hourlyRate || !workedHours || hourlyRate <= 0 || workedHours <= 0) {
    return next(new HttpError('Invalid input values.', 422));
  }

  const PROVINCIAL_TAX_RATE = 0.0505; // 5.05%
  const CPP_RATE = 0.0595;            // 5.95%
  const EI_RATE = 0.0164;             // 1.64%

  const grossPay = hourlyRate * workedHours;
  const provincialTax = grossPay * PROVINCIAL_TAX_RATE;
  const cpp = grossPay * CPP_RATE;
  const ei = grossPay * EI_RATE;

  const totalDeductions = provincialTax + cpp + ei;
  const netPay = grossPay - totalDeductions;


  const paystub = new Paystub({
    hourlyRate,
    workedHours,
    grossPay: grossPay.toFixed(2),
    deductions: {
      provincialTax: provincialTax.toFixed(2),
      cpp: cpp.toFixed(2),
      ei: ei.toFixed(2),
    },
    totalDeductions: totalDeductions.toFixed(2),
    netPay: netPay.toFixed(2),
  });

  try {
    await paystub.save();
  } catch (err) {
    return next(new HttpError('Saving paystub failed, please try again later.', 500));
  }

  res.status(201).json({ paystub });
};

const getAllPaystubs = async (req, res, next) => {
  let paystubs;
  try {
    paystubs = await Paystub.find(); 
  } catch (err) {
    return next(new HttpError('Fetching paystubs failed, please try again later.', 500));
  }

  res.status(200).json({ paystubs });
};

module.exports = { generatePaystub, getAllPaystubs };
