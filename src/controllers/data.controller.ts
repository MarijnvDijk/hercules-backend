import { Request, Response, Router } from 'express';

import Controller from '../interfaces/controller.interface';
import InfoService from '../services/info.service';

class DataController implements Controller {
    public path = '/data';

    public router = Router();

    private infoService = new InfoService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getDataInfo);
    }

    private getDataInfo = async (request: Request, response: Response) => {
        try {
            return response.json(await this.infoService.getInfo());
        } catch {
            return response.status(500);
        }
    }
}

export default DataController;