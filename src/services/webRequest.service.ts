import WebRequestDto from '../repositories/DataTransferObjects/webRequest.dto';
import WebRequestRepository from '../repositories/webRequest.repository';

export default class WebRequestService {
  private webRequestRepository = new WebRequestRepository();

  public getWebRequests = async () => this.webRequestRepository.getWebRequests();

  public storeWebRequest = async (webRequestDetails: WebRequestDto, Id: Number) => this.webRequestRepository.storeTabCapture(webRequestDetails, Id);
}
