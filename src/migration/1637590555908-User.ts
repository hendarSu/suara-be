import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Users } from "../entity/User";

export class User1637590555908 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let user = new Users();
        user.fullname = "ADMIN";
        user.email = "admin@mail.com";
        user.password = "admin@123!";
        user.hashPassword();
        const userRepository = getRepository(Users);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
