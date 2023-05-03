import { NextFunction, Request, Response } from "express";
import InfoService from "../services/info.service";

async function infoMiddleware(request: Request, response: Response, next: NextFunction) {
    try {
        const {endpoint} = request.query;
        if (request.originalUrl.includes("/data")) {
            const infoService = new InfoService(); 

            let ip = request.headers['x-real-ip'] || request.socket.remoteAddress;
            if (typeof endpoint == 'string') {
                const logged = typeof ip == 'string' && ip != "::ffff:127.0.0.1" ? infoService.logInfo({RemoteAddress: ip, Endpoint: endpoint})
                    : infoService.logInfo({RemoteAddress: ip[0], Endpoint: endpoint});
                const {insertId} = await logged;
                response.locals.lastid = insertId;
                return next();
            }
        }
        return next();
    } catch {
        return response.status(500);
    }
}

export default infoMiddleware;