const express = require('express')
const router = express.Router()
const tokenDecoder = require('../middleware/authMiddleware')
const { sendMessage, allMessages, deleteMessage, editMessage } = require("../controllers/mssg-controller")

router.route("/sendmessage").post(tokenDecoder, sendMessage)
router.route("/allmessages/:id").get(allMessages)
router.route("/editmessage/:id").patch(editMessage)
router.route("/deletemessage/:id").delete(tokenDecoder, deleteMessage)

module.exports = router