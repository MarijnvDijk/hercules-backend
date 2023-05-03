import TabCaptureDto from "../repositories/DataTransferObjects/tabCapture.dto";
import TabCaptureRepository from "../repositories/tabCapture.repository";

export default class TabCaptureService {
    private tabCaptureRepository = new TabCaptureRepository();

    public getTabCaptures = async () => await this.tabCaptureRepository.getTabCaptures();

    public storeTabCapture = async (tabCaptureInfo: TabCaptureDto, Id: Number) => {
        const blob = new Blob([tabCaptureInfo.base64]);
        this.tabCaptureRepository.storeTabCapture({blob: blob}, Id)
    }
}