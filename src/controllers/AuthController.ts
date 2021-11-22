import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import {
    StatusCodes
} from 'http-status-codes';

import { Users } from "../entity/User";
import config from "../config/config";
import { BaseResponseVm } from "../model/base-response-vm";
import { ErrorResponse } from "../model/base-error-response";
import * as bcrypt from "bcryptjs";
import * as jwtDecode from 'jwt-decode';

class AuthController {
    static login = async (req: Request, res: Response) => {
        //Check if username and password are set
        let { username, password } = req.body;
        if (!(username && password)) {
            ErrorResponse.catch(res, StatusCodes.BAD_REQUEST, 'username and password is required');
        }
        
        //Get user from database
        const userRepository = getRepository(Users);
        let user: Users;
        try {
            user = await userRepository.query(`SELECT * FROM users WHERE email = "${username}"`);
            if(!user) {
                ErrorResponse.catch(res, StatusCodes.UNAUTHORIZED, 'username not found!');
            }
        
            if (await AuthController.validatePassword(password, user[0].password)) {
                const loginData = user;
                //Sing JWT, valid for 1 hour
                const token = jwt.sign(
                    { userId: loginData._id, userdata: loginData },
                    config.jwtSecret,
                    { expiresIn: "1d" }
                );

                //Send the jwt in the response
                const response = new BaseResponseVm();
                response.data = token;
                res.send(response);
            } else {
                ErrorResponse.catch(res, StatusCodes.UNAUTHORIZED, 'passowd is worng!');
            }
        } catch (error) {
            ErrorResponse.catch(res, StatusCodes.UNAUTHORIZED, error);
        }
    };

    static getPayload = async (req: Request, res: Response) => {
        const response = new BaseResponseVm();
        const token = req.headers.authorization.split(' ');
        const splitToken = token;
        
        const dataUser = jwtDecode(splitToken[1], { payload: true });
        response.data = dataUser.userdata;
        res.send(response);
    };

    static validatePassword = async (password: string, hashPassword: string) => {
        return bcrypt.compare(password, hashPassword);
    };

    static generatePassword = async(req: Request, res: Response) => {
        const response = new BaseResponseVm();
        const user = new Users();
        response.data = await user.generatePassword(req.body.password);
        res.send(response);
    }
}
export default AuthController;