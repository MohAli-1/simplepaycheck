const express = require('express');
const { generatePaystub, getAllPaystubs } = require('../controllers/paystubController');

const router = express.Router();

router.post('/', generatePaystub);
router.get('/', getAllPaystubs);  

module.exports = router;
