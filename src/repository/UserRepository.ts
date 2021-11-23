import { getRepository } from "typeorm";
import { Users } from "../entity/User";

export class UserRepository {
    static store = async (payload: Users) => {
        const user = getRepository(Users);
        payload.hashPassword();
        user.create(payload);
        return user;
    };

    static find = async (query: any) => {
        const user = getRepository(Users);
        const userData = await user.findOne(query);
        return userData;
    }
}