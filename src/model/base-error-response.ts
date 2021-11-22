import { BaseResponseVm } from "./base-response-vm";
import { Response } from "express";
import e = require("express");

export class ErrorResponse {
    static catch(res : Response, code: number, error: any) {
        const response = new BaseResponseVm();
        response.success = false;
        if (error.message) {
            response.message = error.message;
        } else {
            response.message = error;
        }
        response.data = error;
        res.status(code).send(response);
    }
}