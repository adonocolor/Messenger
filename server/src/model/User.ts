import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import {IsString} from "class-validator";
import {Token} from "./Token";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsString()
    name: string

    @Column()
    @IsString()
    email: string

    @Column()
    @IsString()
    password: string

    @OneToMany(
        type => Token,
        token => token.user,
    )
    refreshTokens: Token[];
}
