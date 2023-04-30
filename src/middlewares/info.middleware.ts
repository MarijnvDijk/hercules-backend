import { NextFunction, Request, Response } from "express";

function infoMiddleware(request: Request, response: Response, next: NextFunction) {
    var ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    console.log(ip);

    next();
}

export default infoMiddleware;