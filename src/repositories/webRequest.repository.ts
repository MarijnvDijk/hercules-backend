import { MysqlError } from "mysql";

import BaseCrudRepository from "./base/BaseCrudRepository";
import WebRequestDto from "./DataTransferObjects/webRequest.dto";

export default class WebRequestRepository extends BaseCrudRepository {
    constructor() {
        super('webRequest');
    }

    async getWebRequests(): Promise<WebRequestDto[]>|undefined {
        return new Promise((resolve, reject) => {
            this.db.getPool().getConnection((_, connection) => {
                connection.query(
                    `SELECT * FROM ${this.tableName}`,
                    [],
                    (err: MysqlError, res: WebRequestDto[]) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                );
            });
        });
    }

    async getDataForIP(IP: string): Promise<WebRequestDto[]>|undefined {
        return new Promise((resolve, reject) => {
            this.db.getPool().getConnection((_, connection) => {
                connection.query(
                    `SELECT * FROM ${this.tableName} INNER JOIN info ON info.PK_Id = ${this.tableName}.FK_RequestId WHERE info.RemoteAddress = ?`,
                    [IP],
                    (err: MysqlError, res: WebRequestDto[]) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                );
            });
        });
    }

    async storeTabCapture(webRequestDetails: WebRequestDto, Id: Number): Promise<WebRequestDto> | undefined {
        return new Promise((resolve, reject) => {
            this.db.getPool().getConnection(async (_, connection) => {
                connection.query(
                    `INSERT INTO ${this.tableName} SET ?`,
                    [{
                        FK_RequestId: Id,
                        requestInfo: webRequestDetails.requestInfo
                    }],
                    (err: MysqlError, res: WebRequestDto) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                )
            });
        });
    }
}