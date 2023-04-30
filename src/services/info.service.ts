import InfoRepository from "../repositories/info.repository";

export default class InfoService {
    private infoRepository = new InfoRepository();
    
    public getInfo = async () => await this.infoRepository.getDataInfo();
}