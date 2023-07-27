// @ts-ignore
const express = require('express')
// @ts-ignore
const router = express.Router();
const {login, register, logout} = require('../controllers/authController')

router.route('/login')
    .post(login)
router.route('/register')
    .post(register)
router.route('/logout')
    .get(logout)

module.exports = router;