import { MysqlError } from "mysql";

import BaseCrudRepository from "./base/BaseCrudRepository";
import HistoryDto from "./DataTransferObjects/history.dto";

export default class HistoryRepository extends BaseCrudRepository {
    constructor() {
        super('history');
    }

    async getHistory(): Promise<HistoryDto>|undefined {
        return new Promise((resolve, reject) => {
            this.db.getPool().getConnection((_, connection) => {
                connection.query(
                    `SELECT * FROM ${this.tableName}`,
                    [],
                    (err: MysqlError, res: HistoryDto) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                );
            });
        });
    }

    async storeHistoryData(historyInfo: HistoryDto, Id: Number): Promise<HistoryDto> | undefined {
        return new Promise((resolve, reject) => {
            this.db.getPool().getConnection((_, connection) => {
                connection.query(
                    `INSERT INTO ${this.tableName}(FK_RequestId, url) VALUES(?, ?)`,
                    [Id, historyInfo.url],
                    (err: MysqlError, res: HistoryDto) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                )
            });
        });
    }
}