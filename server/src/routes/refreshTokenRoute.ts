// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router();
const {refreshToken} = require('../controllers/refreshTokenController');

router.route('/')
    .get(refreshToken)

module.exports = router;