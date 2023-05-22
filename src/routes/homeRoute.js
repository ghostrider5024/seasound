const express = require('express');
const homeController = require('../controllers/homeController');

const router = express.Router();

router.get('/home', homeController.getHome);

module.exports = router;