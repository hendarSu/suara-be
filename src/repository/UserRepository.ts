import { getRepository } from "typeorm";
import { Users } from "../entity/User";

export class UserRepository {
    static store = async (payload: Users) => {
        const user = getRepository(Users);
        payload.hashPassword();
        user.save(payload);
        return user;
    };
}