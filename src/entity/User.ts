import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["users"])
export class User {
    @PrimaryGeneratedColumn()
    _id: number;

    @Column({ type: String })
    @IsNotEmpty()
    fullname: string;

    @Column({ type: String })
    email: string;

    @Column({ type: String })
    @Length(4, 100)
    password: string;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}