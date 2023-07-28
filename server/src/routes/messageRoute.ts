// @ts-ignore
const express = require('express')
// @ts-ignore
const router = express.Router();
const { makeMessage, getMessages }  = require('../controllers/messageController')

router.route('/:chatId')
    .post(makeMessage)
    .get(getMessages)

module.exports = router;