import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./User";
import {Chat} from "./Chat";

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(
        () => Chat,
            chat => chat.messages)
    @JoinColumn({
        name: 'chatId',
    })
    chat: Chat;

    @ManyToOne(
        () => User
    )
    @JoinColumn({
        name: 'userId',
    })
    author: User;

    @Column()
    text: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}