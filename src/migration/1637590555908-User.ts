import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { User } from "../entity/User";

export class User1637590555908 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let user = new User();
        user.fullname = "ADMIN";
        user.email = "admin@mail.com";
        user.password = "admin@123!";
        user.hashPassword();
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
