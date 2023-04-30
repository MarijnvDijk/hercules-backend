import { NextFunction, Request, Response } from "express";
import InfoService from "../services/info.service";

function infoMiddleware(request: Request, response: Response, next: NextFunction) {
    try {
        const {endpoint} = request.query;
        if (request.originalUrl.includes("/data")) {
            const infoService = new InfoService(); 

            let ip = request.headers['x-real-ip'] || request.socket.remoteAddress;
            if (typeof endpoint == 'string') {
                typeof ip == 'string' ? infoService.logInfo({RemoteAddress: ip, Endpoint: endpoint}) : infoService.logInfo({RemoteAddress: ip[0], Endpoint: endpoint});
                return next();
            }
        }
        return next();
    } catch {
        return response.status(500);
    }
}

export default infoMiddleware;