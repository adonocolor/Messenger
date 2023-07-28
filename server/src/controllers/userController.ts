import {AppDataSource} from "../data-source";
import {User} from "../model/User";
import {Like} from "typeorm";


const userRepository = AppDataSource.getRepository(User);

const getUsers = async (req, res) => {
    const users = await userRepository.find({
        where: [
            {email: Like(`%${req.params.search}%`)},
            {name: Like(`%${req.params.search}%`)},
        ],
        select : {
            id: true,
            name: true,
            email : true,
        }
    })

    return res.json(users)
}

module.exports = { getUsers };
