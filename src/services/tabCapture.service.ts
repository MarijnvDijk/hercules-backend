import TabCaptureDto from "../repositories/DataTransferObjects/tabCapture.dto";
import TabCaptureRepository from "../repositories/tabCapture.repository";

export default class TabCaptureService {
    private tabCaptureRepository = new TabCaptureRepository();

    public getTabCaptures = async () => await this.tabCaptureRepository.getTabCaptures();

    public storeTabCapture = async (fileBuffer: Buffer, Id: Number) => this.tabCaptureRepository.storeTabCapture({capture: fileBuffer}, Id)
}