import { MysqlError } from 'mysql';

import BaseCrudRepository from './base/BaseCrudRepository';
import ClipboardDto from './DataTransferObjects/clipboard.dto';

export default class ClipboardRepository extends BaseCrudRepository {
  constructor() {
    super('clipboard');
  }

  async getDataInfo(): Promise<ClipboardDto[]> | undefined {
    return new Promise((resolve, reject) => {
      this.db.getPool().getConnection((_, connection) => {
        connection.query(
          `SELECT * FROM ${this.tableName}`,
          [],
          (err: MysqlError, res: ClipboardDto[]) => {
            if (err) reject(err);
            else resolve(res);
          },
        );
      });
    });
  }

  async getDataForIP(IP: string): Promise<ClipboardDto[]> | undefined {
    return new Promise((resolve, reject) => {
      this.db.getPool().getConnection((_, connection) => {
        connection.query(
          `SELECT * FROM ${this.tableName} INNER JOIN info ON info.PK_Id = ${this.tableName}.FK_RequestId WHERE info.RemoteAddress = ?`,
          [IP],
          (err: MysqlError, res: ClipboardDto[]) => {
            if (err) reject(err);
            else resolve(res);
          },
        );
      });
    });
  }

  async storeClipboardData(clipboardInfo: ClipboardDto, Id: Number): Promise<ClipboardDto> | undefined {
    return new Promise((resolve, reject) => {
      this.db.getPool().getConnection((_, connection) => {
        connection.query(
          `INSERT INTO ${this.tableName}(FK_RequestId, data) VALUES(?, ?)`,
          [Id, clipboardInfo.data],
          (err: MysqlError, res: ClipboardDto) => {
            if (err) reject(err);
            else resolve(res);
          },
        );
      });
    });
  }
}
