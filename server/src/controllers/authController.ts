import {AppDataSource} from "../data-source";
import {User} from "../model/User";
import validator from "validator";
import {Token} from "../model/Token";
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userRepository = AppDataSource.getRepository(User);
const tokenRepository = AppDataSource.getRepository(Token);
export const createAccessToken = (user) => {
    return jwt.sign({
        name : user.name,
        email : user.email,
    },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '15m'});
}

export const createRefreshToken = (user) => {
    return jwt.sign({
            name : user.name,
            email : user.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'});
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
        const refreshToken = createRefreshToken(user);

        let token = await tokenRepository.findOneBy({ user: user })
        if (!token) {
            await tokenRepository.save(Object.assign(new Token(), {
                user: user,
                refreshToken : refreshToken,
            }))
        } else {
            await tokenRepository.save({
                id: token.id,
                user: user,
                refreshToken : refreshToken,
            })
        }

        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        return res.status(200).json({ accessToken })
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

        let savedUser = await userRepository.save(user);

        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        await tokenRepository.save(Object.assign(new Token(), {
            user: savedUser,
            refreshToken : refreshToken,
        }))

        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        return res.status(200).json({accessToken})
    } catch (error) {
        return error;
    }
}

const logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;
    const foundToken = await tokenRepository.findOneBy({refreshToken : refreshToken})
    if (!foundToken) {
        res.clearCookie('jwt', { httpOnly : true, maxAge: 24 * 60 * 60 * 1000 })
        return res.sendStatus(204);
    }

    await tokenRepository.delete(foundToken)
    res.clearCookie('jwt', { httpOnly : true, maxAge: 24 * 60 * 60 * 1000 })
    res.sendStatus(204)
}

module.exports = {login, register, logout}