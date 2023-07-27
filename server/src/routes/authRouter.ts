// @ts-ignore
const express = require('express')
// @ts-ignore
const router = express.Router();
const {login, register} = require('../controllers/authController')

router.route('/login')
    .post(login)
router.route('/register')
    .post(register)

module.exports = router;