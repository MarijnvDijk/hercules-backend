import InfoDto from "../repositories/DataTransferObjects/info.dto";
import InfoRepository from "../repositories/info.repository";

export default class InfoService {
    private infoRepository = new InfoRepository();
    
    public getInfo = async () => await this.infoRepository.getDataInfo();

    public logInfo = async (requestInfo: InfoDto) => await this.infoRepository.logInfo(requestInfo);
}