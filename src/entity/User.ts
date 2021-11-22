import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["email"])
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

    async generatePassword(password: string): Promise<string> {
        return bcrypt.hashSync(password, 8);
    }

    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string, hashPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, hashPassword);
    }
}