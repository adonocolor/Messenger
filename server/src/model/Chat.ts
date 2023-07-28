import {
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./User";
import {Message} from "./Message";

@Entity('chats')
export class Chat {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(type => User)
    @JoinTable(
        {
            name: "chats_users",
            joinColumn: {
                name: "chatId",
                referencedColumnName: "id"
            },
            inverseJoinColumn: {
                name: "userId",
                referencedColumnName: "id"
            }
        }
    )
    participants: User[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => Message, message => message.chat)
    messages: Message[];
}