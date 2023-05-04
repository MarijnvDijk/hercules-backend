import { MysqlError } from 'mysql';

import BaseCrudRepository from './base/BaseCrudRepository';
import InfoDto from './DataTransferObjects/info.dto';

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
          },
        );
      });
    });
  }

  async logInfo(requestInfo: InfoDto): Promise<any> | undefined {
    return new Promise((resolve, reject) => {
      this.db.getPool().getConnection((_, connection) => {
        connection.query(
          `INSERT INTO ${this.tableName}(RemoteAddress, Endpoint) VALUES(?, ?)`,
          [requestInfo.RemoteAddress, requestInfo.Endpoint],
          (err: MysqlError, res: any) => {
            if (err) reject(err);
            else resolve(res);
          },
        );
      });
    });
  }
}
