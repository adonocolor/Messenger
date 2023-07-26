import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"
import {IsString} from "class-validator";

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
