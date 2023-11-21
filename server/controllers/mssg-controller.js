const asyncHandler = require("express-async-handler")
const { StatusCodes } = require('http-status-codes')
const Mssg = require('../model/mssg-model')
const Chat = require('../model/chat-model')
const User = require('../model/user-model')


const sendMessage = asyncHandler(async(req, res) => {
    const { content, chatId } = req.body
    if (!content || !chatId) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please fill all fields" })
    }
    var message = await Mssg.create({
        content: content,
        sender: req.userInfo.id,
        chat: chatId
    })

    message = await message.populate("sender", "name userName email picture")
    message = await message.populate("chat")
    message = await User.populate(message, {
        path: "chat.users",
        select: "name userName email picture"
    })
    message = await User.populate(message, {
        path: "chat.groupAdmin",
        select: "name userName email picture"
    })


    await Chat.findByIdAndUpdate({ _id: chatId }, { latestMessage: message })
        .populate("users", "-passsword")
        .populate("groupAdmin", "-password")

    res.status(StatusCodes.OK).json({ message })


})

const allMessages = asyncHandler(async(req, res) => {
    const { id: chatId } = req.params
    var allmessages = await Mssg.find({ chat: chatId })
        .populate("sender", "name userName picture email")
        .populate("chat")

    // this is for populating the groupAdmin
    // allmessages = await User.populate(allmessages, {  
    //     path: "chat.groupAdmin",
    //     select: "name userName email picture"
    // })
    res.status(StatusCodes.OK).json({ nbHit: allmessages.length, msg: `all messges associated with chat ${chatId}`, allmessages })
})

const editMessage = asyncHandler(async(req, res) => {
    const { id: messageId } = req.params
    const { content } = req.body
    const message = await Mssg.findByIdAndUpdate(messageId, { content }, { new: true, runValidators: true })
        .populate("sender", "name userName email picture")
        .populate("chat")
    if (!message) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: `Message with ${messageId} not found.` })
    }
    res.status(StatusCodes.OK).json({ msg: `message with id: ${messageId} updated`, mssg: message })
})

const deleteMessage = asyncHandler(async(req, res) => {
    const { id: messageId } = req.params
    const message = await Mssg.findByIdAndDelete(messageId)
    if (!message) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: `Message with ${messageId} not found.` })
    }
    res.status(StatusCodes.OK).json({ msg: `message with id: ${messageId} deleted`, mssg: message })
})

module.exports = { sendMessage, allMessages, deleteMessage, editMessage }