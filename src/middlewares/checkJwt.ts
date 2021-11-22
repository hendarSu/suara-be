import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import {
    StatusCodes
} from 'http-status-codes';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    if (!req.get('Authorization')) {
        res.status(StatusCodes.UNAUTHORIZED).send({ 'message': "Format token tidak sesuai, Format header harus Authorization", 'status': StatusCodes.UNAUTHORIZED });
        return;
    }
    
    let authorization = req.get('Authorization');
    let authorizationArr = authorization.split(' ');
    if (authorizationArr[0] !== 'Bearer') {
        res.status(StatusCodes.UNAUTHORIZED).send({ 'message': "Format header harus Bearer Schema", 'status': StatusCodes.UNAUTHORIZED });
        return;
    }

    let token = authorizationArr[1];
    let jwtPayload;

    //Try to validate the token and get data
    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //If token is not valid, respond with StatusCodes.UNAUTHORIZED (unauthorized)
        res.status(StatusCodes.UNAUTHORIZED).send({ 'message': 'Token is not valid', 'status': StatusCodes.UNAUTHORIZED});
        return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);

    //Call the next middleware or controller
    next();
};