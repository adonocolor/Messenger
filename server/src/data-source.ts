import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./model/User"
import {Message} from "./model/Message";
import {Chat} from "./model/Chat";
import {Token} from "./model/Token";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Chat, Message, Token],
    migrations: [],
    subscribers: [],
})
