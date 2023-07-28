import {AppDataSource} from "../data-source";
import {Chat} from "../model/Chat";
import {User} from "../model/User";
import {In} from "typeorm";


const chatRepository = AppDataSource.getRepository(Chat);
const userRepository = AppDataSource.getRepository(User);
const getChats = async (req, res) => {
    const user = await userRepository.findOneBy({
        id : req.user.id,
    })

    if (!user)
        return res.sendStatus(404);

    const allChats = await chatRepository.find({
        where : {
            participants : {
                id : req.user.id,
            }
        },
        select: {
            id: true,
        },
        relations: {
            participants: true,
        },
    });


    const chats = await chatRepository.find({
        where : {
            id : In(allChats.map(item => item.id))
        },
        select: {
            id: true,
            participants: {
                id: true,
                name: true,
                email : true,
            }
        },
        relations: {
            participants: true,
        },
        order : {
            updatedAt : "DESC",
        }
    })

    return res.json(chats);
}

const makeChat = async (req, res) => {
    const foundUsers = await userRepository.find( {
        where : {
            id : In([req.user.id, req.params.id])
        },
        select: {
            id : true,
            name : true,
            email : true
        }
    })

    if (await chatRepository.findOneBy({
        participants : foundUsers
    })) return res.sendStatus(204);

    const chat  = Object.assign(new Chat(), {
        participants : foundUsers,
    })

    await chatRepository.save(chat);

    return res.json(chat);
}

const deleteChat = async (req, res) => {
    const foundChat = await chatRepository.findOne({
        where : {
            id: req.params.id
        },
        select : {
            id : true,
            participants: {
                id: true
            }
        },
        relations: {
            participants: true,
        },
    })

    if (!foundChat)
        return res.sendStatus(404);

    if (!foundChat.participants.map(item => item.id).includes(req.user.id))
        return res.sendStatus(404);


    await chatRepository.delete({ id : foundChat.id });
    return res.sendStatus(204);
}

module.exports = { getChats, makeChat, deleteChat };
