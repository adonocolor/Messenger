import {Chat} from "../model/Chat";
import {AppDataSource} from "../data-source";
import {User} from "../model/User";
import {Message} from "../model/Message";
import {ArrayContainedBy, ArrayContains} from "typeorm";

const chatRepository = AppDataSource.getRepository(Chat);
const messageRepository = AppDataSource.getRepository(Message)
const userRepository = AppDataSource.getRepository(User);


const makeMessageByChatId = async (req, res) => {
    const { text } = req.body;
    const chat = await chatRepository.findOne({
        where : {
            id : req.params.chatId
        },
        relations: {
            participants: true
        },
        select: {
            id : true,
            participants: {
                id: true,
            }
        }
    })

    if (!chat)
        return res.sendStatus(404)

    if (!chat.participants.map(item => item.id).includes(req.user.id))
        return res.sendStatus(403)

    const message = Object.assign(new Message(), {
        author : req.user.id,
        chat : req.params.chatId,
        text : text,
    })

    await messageRepository.save(message);
    return res.json(message);
}

const makeMessageByUserId = async (req, res) => {
    const {text} = req.body;

    const foundUser = await userRepository.findOne({
        where: {
            id: req.params.userId
        }
    })

    if (!foundUser)
        return res.sendStatus(404);

    const foundChat = await chatRepository.findOne({
        where: {
            participants: ArrayContains([req.user, foundUser]),
        },
        relations: {
            participants: true
        },
        select: {
            id: true,
            participants: {
                id: true,
            }
        }
    })

    if (!foundChat) {
        let chat  = await chatRepository.save(Object.assign(new Chat(), {
            participants : [req.user, foundUser],
        }))
        const message = Object.assign(new Message(), {
            author: req.user.id,
            chat: chat.id,
            text: text,
        })
        await messageRepository.save(message);
    }

    const message = Object.assign(new Message(), {
        author: req.user.id,
        chat: foundChat.id,
        text: text,
    })

    await messageRepository.save(message);
    return res.json(message);
}

const getMessages = async (req, res) => {
    const chat = await chatRepository.findOne({
        where : {
            id : req.params.chatId
        },
        relations: {
            participants: true
        },
        select: {
            id : true,
            participants: {
                id: true,
            }
        }
    })

    if (!chat)
        return res.sendStatus(404)

    if (!chat.participants.map(item => item.id).includes(req.user.id))
        return res.sendStatus(403)

    const messages = await messageRepository.find({
        where : {
            chat : {
                id : req.params.chatId,
            }
        },
        order : {
            updatedAt : "DESC",
        },
        relations: {
            author : true,
        },
        select : {
            author : {
                id : true,
                name : true,
            }
        }
    })

    return res.json(messages);
}

const deleteMessage = async (req, res) => {
    const chat = await chatRepository.findOne({
        where : {
            id : req.params.chatId
        },
        relations: {
            participants: true
        },
        select: {
            id : true,
            participants: {
                id: true,
            }
        }
    })

    if (!chat)
        return res.sendStatus(404)

    const message = chat.messages.find(message => req.params.id === message.id);
    if (!message)
        return res.sendStatus(404);

    await messageRepository.remove(message);
    return res.sendStatus(204);
}

module.exports = {
    makeMessageByChatId,
    makeMessageByUserId,
    getMessages,
    deleteMessage,
}