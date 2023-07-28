import {Chat} from "../model/Chat";
import {AppDataSource} from "../data-source";
import {User} from "../model/User";
import {Message} from "../model/Message";

const chatRepository = AppDataSource.getRepository(Chat);
const messageRepository = AppDataSource.getRepository(Message);

const makeMessage = async (req, res) => {
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
        }
    })

    return res.json(messages);
}

module.exports = {
    makeMessage,
    getMessages,
}