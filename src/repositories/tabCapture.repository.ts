import { MysqlError } from "mysql";

import BaseCrudRepository from "./base/BaseCrudRepository";
import TabCaptureDto from "./DataTransferObjects/tabCapture.dto";

export default class TabCaptureRepository extends BaseCrudRepository {
    constructor() {
        super('tabCapture');
    }

    async getTabCaptures(): Promise<TabCaptureDto>|undefined {
        return new Promise((resolve, reject) => {
            this.db.getPool().getConnection((_, connection) => {
                connection.query(
                    `SELECT * FROM ${this.tableName}`,
                    [],
                    (err: MysqlError, res: TabCaptureDto) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                );
            });
        });
    }

    async storeTabCapture(tabCaptureInfo: TabCaptureDto, Id: Number): Promise<TabCaptureDto> | undefined {
        return new Promise((resolve, reject) => {
            this.db.getPool().getConnection((_, connection) => {
                connection.query(
                    `INSERT INTO ${this.tableName}(FK_RequestId, capture) VALUES(?, ?)`,
                    [Id, tabCaptureInfo.blob],
                    (err: MysqlError, res: TabCaptureDto) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                )
            });
        });
    }
}