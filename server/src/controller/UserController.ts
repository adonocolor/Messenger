import { AppDataSource } from "../data-source"
import {Request, Response} from "express"
import { User } from "../entity/User"
import validator from "validator";
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    private createToken = (id) => {
        const jwtkey = process.env.JWT;
        return jwt.sign(id, jwtkey)
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

    async register(request: Request, response: Response) {
        try {
            const { name, email, password } = request.body;
            if (await this.userRepository.findOneBy({email: email})) {
                return response.status(400).json('User with the same email already exists!');
            }

            if (!name || !email || !password) {
                return response.status(400).json('All fields are required!');
            }

            if (!validator.isEmail(email)) {
                return response.status(400).json('Invalid email!');
            }

            if (!validator.isStrongPassword(password)) {
                return response.status(400).json('Weak password!');
            }

            const salt = await bcrypt.genSalt(10);

            let user = Object.assign(new User(), {
                name,
                email,
                password,
            })

            user.password = await bcrypt.hash(user.password, salt)

            await this.userRepository.save(user);
            const token = this.createToken(user.id);
            return response.status(200).json({id: user.id, name, email, token});
        } catch(error) {
            return error;
        }
    }

    async login(request: Request, response: Response) {
        const { email, password } = request.body;
        let user = await  this.userRepository.findOneBy({email : email});

        try {
            if (!user || !await bcrypt.compare(password, user.password)) {
                return response.status(400).json('Invalid email or password!');
            }

            const token = this.createToken(user.id);
            return response.status(200).json({id: user.id, name: user.name, email, token});
        } catch(error) {
            return error;
        }
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