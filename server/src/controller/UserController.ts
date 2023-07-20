import { AppDataSource } from "../data-source"
import {Request, Response} from "express"
import { User } from "../entity/User"
import validator from "validator";
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    private createAccessToken = (user) => {
        return jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d'});
    }

    private authenticateToken = (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (!token) return res.sendStatus(401)

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403)
            req.user = user
            next()
        })
    }

    async login(request: Request, response: Response) {
        const { email, password } = request.body;
        let user = await  this.userRepository.findOneBy({email : email});

        try {
            if (!user || !await bcrypt.compare(password, user.password)) {
                return response.status(400).send({
                    message : 'Invalid email or password!'
                });
            }

            const accessToken = this.createAccessToken(user);
            return response.status(200).json({accessToken});
        } catch(error) {
            return error;
        }
    }

    async register(request: Request, response: Response) {
        try {
            const { name, email, password } = request.body;
            if (await this.userRepository.findOneBy({email: email})) {
                return response.status(400).send({
                    message : 'Email like this exists!'
                });
            }

            if (!name || !email || !password) {
                return response.status(400).send({
                    message : 'All fields are required!'
                });
            }

            if (!validator.isEmail(email)) {
                return response.status(400).send({
                    message : 'Invalid email!'
                });
            }

            if (!validator.isStrongPassword(password)) {
                return response.status(400).send({
                    message : 'Weak password!'
                });
            }

            const salt = await bcrypt.genSalt(10);

            let user = Object.assign(new User(), {
                name,
                email,
                password,
            })

            user.password = await bcrypt.hash(user.password, salt)

            await this.userRepository.save(user);
            const accessToken = this.createAccessToken(user);
            return response.status(200).json({accessToken})
        } catch(error) {
            return error.message;
        }
    }


    async all(request: Request, response: Response) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async remove(request: Request, response: Response) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }
}