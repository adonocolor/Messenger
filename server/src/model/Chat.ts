import {
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./User";

@Entity('chats')
export class Chat {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany((type) => User, {
        cascade: true,
    })
    @JoinTable({
        name: 'chats_users',
        joinColumn: {
            name: 'chats',
            referencedColumnName: 'id',
            },
            inverseJoinColumn: {
                name: 'users',
                referencedColumnName: 'id',
            },
    })
    participants: User[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}