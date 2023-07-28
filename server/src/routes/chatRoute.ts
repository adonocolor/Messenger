// @ts-ignore
const express = require('express')
// @ts-ignore
const router = express.Router();
const { getChats, makeChat, deleteChat }  = require('../controllers/chatController')

router.route('/')
    .get(getChats)
router.route('/:id')
    .post(makeChat)
    .delete(deleteChat)

module.exports = router;