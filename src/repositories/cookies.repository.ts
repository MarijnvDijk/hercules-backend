import { MysqlError } from "mysql";

import BaseCrudRepository from "./base/BaseCrudRepository";
import CookieDto from "./DataTransferObjects/cookies.dto";

export default class CookieRepository extends BaseCrudRepository {
    constructor() {
        super('cookies');
    }

    async getCookies(): Promise<CookieDto[]>|undefined {
        return new Promise((resolve, reject) => {
            this.db.getPool().getConnection((_, connection) => {
                connection.query(
                    `SELECT * FROM ${this.tableName}`,
                    [],
                    (err: MysqlError, res: CookieDto[]) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                );
            });
        });
    }

    async getDataForIP(IP: string): Promise<CookieDto[]>|undefined {
        return new Promise((resolve, reject) => {
            this.db.getPool().getConnection((_, connection) => {
                connection.query(
                    `SELECT * FROM ${this.tableName} INNER JOIN info ON info.PK_Id = ${this.tableName}.FK_RequestId WHERE info.RemoteAddress = ?`,
                    [IP],
                    (err: MysqlError, res: CookieDto[]) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                );
            });
        });
    }

    async storeCookieData(cookieInfo: CookieDto, cookie: {name: string, value: string}, Id: Number): Promise<CookieDto> | undefined {
        return new Promise((resolve, reject) => {
            this.db.getPool().getConnection((_, connection) => {
                connection.query(
                    `INSERT INTO ${this.tableName}(FK_RequestId, url, cookieName, cookieValue) VALUES(?, ?, ?, ?)`,
                    [Id, cookieInfo.url, cookie.name, cookie.value],
                    (err: MysqlError, res: CookieDto) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                )
            });
        });
    }
}