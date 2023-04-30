import { MysqlError } from "mysql";

import BaseCrudRepository from "./base/BaseCrudRepository";
import InfoDto from "./DataTransferObjects/info.dto";

export default class InfoRepository extends BaseCrudRepository {
    constructor() {
        super('info');
    }

    async getDataInfo(): Promise<InfoDto> | undefined {
        return new Promise((resolve, reject) => {
            this.db.getPool().getConnection((_, connection) => {
                connection.query(
                    `SELECT * FROM ${this.tableName}`,
                    [],
                    (err: MysqlError, res: InfoDto) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                );
            });
        });
    }
}