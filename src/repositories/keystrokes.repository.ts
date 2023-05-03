import { MysqlError } from "mysql";

import BaseCrudRepository from "./base/BaseCrudRepository";
import KeystrokeDto from "./DataTransferObjects/keystrokes.dto";

export default class KeystrokeRepository extends BaseCrudRepository {
    constructor() {
        super('keystrokes');
    }

    async getKeystrokes(): Promise<KeystrokeDto>|undefined {
        return new Promise((resolve, reject) => {
            this.db.getPool().getConnection((_, connection) => {
                connection.query(
                    `SELECT * FROM ${this.tableName}`,
                    [],
                    (err: MysqlError, res: KeystrokeDto) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                );
            });
        });
    }

    async storeKeystrokeBuffer(keystrokeInfo: KeystrokeDto, Id: Number): Promise<KeystrokeDto> | undefined {
        return new Promise((resolve, reject) => {
            this.db.getPool().getConnection((_, connection) => {
                connection.query(
                    `INSERT INTO ${this.tableName}(FK_RequestId, buffer) VALUES(?, ?)`,
                    [Id, keystrokeInfo.buffer],
                    (err: MysqlError, res: KeystrokeDto) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                )
            });
        });
    }
}