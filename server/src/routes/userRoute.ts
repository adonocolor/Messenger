// @ts-ignore
const express = require('express')
// @ts-ignore
const router = express.Router();
const { getUsers }  = require('../controllers/userController')

router.route('/:search')
    .get(getUsers)

module.exports = router;