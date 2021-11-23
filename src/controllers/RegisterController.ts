import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getRepository } from "typeorm";
import { Users } from "../entity/User";
import { ErrorResponse } from "../model/base-error-response";
import { BaseResponseVm } from "../model/base-response-vm";
import { UserRepository } from "../repository/UserRepository";

export class RegisterController {
    static store = async (req: Request, res: Response) => {
        const { fullname, username, password } = req.body;
        const user = new Users();
        user.fullname = fullname;
        user.password = password;
        user.email = username;

        const validate = await RegisterController.validateEmail(username, res);
        if(validate) {
            await UserRepository.store(user);
            const response = new BaseResponseVm();
            res.send(response);
        }

        
    };

    static validateEmail = async (email: string, res: Response) => {
        const userData = await UserRepository.find({email: email});
        if(userData) {
            return ErrorResponse.catch(res, StatusCodes.BAD_REQUEST, 'username is already!');
        } 

        return true;
    }
}