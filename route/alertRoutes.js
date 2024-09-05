const express = require('express');
const router = express.Router();
const { sendAlerts } = require('../controllers/alertController');

router.post('/', sendAlerts);

module.exports = router;
