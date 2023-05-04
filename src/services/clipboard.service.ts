import ClipboardRepository from '../repositories/clipboard.repository';
import ClipboardDto from '../repositories/DataTransferObjects/clipboard.dto';

export default class ClipboardService {
  private clipboardRepository = new ClipboardRepository();

  public getClipboardData = async () => this.clipboardRepository.getDataInfo();

  public storeClipboardData = async (clipboardData: ClipboardDto, Id: Number) => (clipboardData.data != null
    ? this.clipboardRepository.storeClipboardData(clipboardData, Id) : null);
}
