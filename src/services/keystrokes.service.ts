import KeystrokeDto from "../repositories/DataTransferObjects/keystrokes.dto";
import KeystrokeRepository from "../repositories/keystrokes.repository"

export default class KeystrokeService {
    private keystrokeRepository = new KeystrokeRepository();

    public getKeystrokes = async () => await this.keystrokeRepository.getKeystrokes();
    
    public storeKeystrokeBuffer = async (keystrokeInfo: KeystrokeDto, Id: Number) => 
        keystrokeInfo.buffer != null ? await this.keystrokeRepository.storeKeystrokeBuffer(keystrokeInfo, Id) : null;
}