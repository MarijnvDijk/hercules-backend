import KeystrokeDto from '../repositories/DataTransferObjects/keystrokes.dto';
import KeystrokeRepository from '../repositories/keystrokes.repository';

export default class KeystrokeService {
  private keystrokeRepository = new KeystrokeRepository();

  public getKeystrokes = async () => this.keystrokeRepository.getKeystrokes();

  public storeKeystrokeBuffer = async (keystrokeInfo: KeystrokeDto, Id: Number) => (keystrokeInfo.buffer != null ? this.keystrokeRepository.storeKeystrokeBuffer(keystrokeInfo, Id) : null);
}
