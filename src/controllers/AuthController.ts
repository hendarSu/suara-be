import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import {
    StatusCodes
} from 'http-status-codes';

import { User } from "../entity/User";
import config from "../config/config";
import { BaseResponseVm } from "../model/base-response-vm";
import { ErrorResponse } from "../model/base-error-response";
import  * as crypto from 'crypto-js';
import * as jwtDecode from 'jwt-decode';

class AuthController {
    static login = async (req: Request, res: Response) => {
        //Check if username and password are set
        let { username, password } = req.body;
        if (!(username && password)) {
            ErrorResponse.catch(res, StatusCodes.BAD_REQUEST, 'username and password is required');
        }
        
        password = crypto.SHA256(password);
        //Get user from database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.query(`CALL 300_report_login('${username}', '${password}')`);
            
            const loginData = user[0][0];
            if (loginData.user_id) {
                //Sing JWT, valid for 1 hour
                const token = jwt.sign(
                    { userId: loginData.user_id, userdata: loginData },
                    config.jwtSecret,
                    { expiresIn: "1d" }
                );

                //Send the jwt in the response
                const response = new BaseResponseVm();
                response.data = token;
                res.send(response);
            } else {
                ErrorResponse.catch(res, StatusCodes.UNAUTHORIZED, loginData.login_msg);
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
}
export default AuthController;