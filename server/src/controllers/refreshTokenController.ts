import {AppDataSource} from "../data-source";
import {Token} from "../model/Token";
import {User} from "../model/User";

const tokenRepository = AppDataSource.getRepository(Token);
const userRepository = AppDataSource.getRepository(User);
const jwt = require('jsonwebtoken');

const refreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt)
        return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const token = await tokenRepository.findOne({
        where : {
            refreshToken: refreshToken
        },
        select : {
            user: {
                id : true
            }
        },
        relations: {
            user : true
        }
    });

    if (!token)
        return res.sendStatus(403);

    const user = await userRepository.findOne({
            where : { id: token.user.id },
            select : { email: true, name : true}
    })

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || decoded.name !== user.name || decoded.email !== user.email)
                return res.sendStatus(403);

            const accessToken = jwt.sign(
                { name : decoded.name, email: decoded.email},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn : '15m' }
            );

            res.json({ accessToken });
        }
    )
}

module.exports = {
    refreshToken
}