import {AppDataSource} from "../data-source";
import {User} from "../model/User";
import validator from "validator";
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userRepository = AppDataSource.getRepository(User);
export const createAccessToken = (user) => {
    return jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
}

const login = async (req, res) => {
    const {email, password} = req.body;
    let user = await userRepository.findOneBy({email: email});

    try {
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).send({
                message: 'Invalid email or password!'
            });
        }

        const accessToken = createAccessToken(user);

        let obj = {name: user.name, email: user.email}
        return res.status(200).json({user: obj, accessToken})
    } catch (error) {
        return error;
    }
}

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if (await userRepository.findOneBy({email: email})) {
            return res.status(400).send({
                message: 'Email like this exists!'
            });
        }

        if (!name || !email || !password) {
            return res.status(400).send({
                message: 'All fields are required!'
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).send({
                message: 'Invalid email!'
            });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).send({
                message: 'Weak password!'
            });
        }

        const salt = await bcrypt.genSalt(10);

        let user = Object.assign(new User(), {
            name,
            email : email.toLowerCase(),
            password,
        })

        user.password = await bcrypt.hash(user.password, salt)

        await userRepository.save(user);
        const accessToken = createAccessToken(user);
        let obj = {name: user.name, email: user.email}
        return res.status(200).json({user: obj, accessToken})
    } catch (error) {
        return error;
    }
}

module.exports = {login, register}