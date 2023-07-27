import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm"
import {User} from "./User";

@Entity('tokens')
export class Token {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(
        type => User,
        user => user.refreshTokens,
        {
            cascade: true,
            onDelete: "CASCADE",
        }
    )
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'id'
    })
    user: User;

    @Column()
    refreshToken: string;
}
