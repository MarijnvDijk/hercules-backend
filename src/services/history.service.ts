import HistoryDto from "../repositories/DataTransferObjects/history.dto";
import HistoryRepository from "../repositories/history.repository";

export default class HistoryService {
    private historyRepository = new HistoryRepository();

    public getHistoryData = async () => await this.historyRepository.getHistory();

    public storeHistoryData = async (historyData: HistoryDto, Id: Number) => historyData.url != null ? await this.historyRepository.storeHistoryData(historyData, Id) : null;
}