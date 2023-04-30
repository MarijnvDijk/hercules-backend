import { NextFunction, Request, Response } from "express";

function infoMiddleware(request: Request, response: Response, next: NextFunction) {
    var ip = request.headers['X-Real-IP'] || request.socket.remoteAddress;
    console.log(ip);

    next();
}

export default infoMiddleware;