import { MysqlError } from 'mysql';

import BaseCrudRepository from './base/BaseCrudRepository';
import TabCaptureDto from './DataTransferObjects/tabCapture.dto';

export default class TabCaptureRepository extends BaseCrudRepository {
  constructor() {
    super('tabCapture');
  }

  async getTabCaptures(): Promise<TabCaptureDto[]> | undefined {
    return new Promise((resolve, reject) => {
      this.db.getPool().getConnection((_, connection) => {
        connection.query(
          `SELECT * FROM ${this.tableName}`,
          [],
          (err: MysqlError, res: TabCaptureDto[]) => {
            if (err) reject(err);
            else resolve(res);
          },
        );
      });
    });
  }

  async getDataForIP(IP: string): Promise<TabCaptureDto[]> | undefined {
    return new Promise((resolve, reject) => {
      this.db.getPool().getConnection((_, connection) => {
        connection.query(
          `SELECT * FROM ${this.tableName} INNER JOIN info ON info.PK_Id = ${this.tableName}.FK_RequestId WHERE info.RemoteAddress = ?`,
          [IP],
          (err: MysqlError, res: TabCaptureDto[]) => {
            if (err) reject(err);
            else resolve(res);
          },
        );
      });
    });
  }

  async storeTabCapture(fileBuffer: TabCaptureDto, Id: Number): Promise<TabCaptureDto> | undefined {
    return new Promise((resolve, reject) => {
      this.db.getPool().getConnection(async (_, connection) => {
        connection.query(
          `INSERT INTO ${this.tableName} SET ?`,
          [{
            FK_RequestId: Id,
            capture: fileBuffer.capture,
          }],
          (err: MysqlError, res: TabCaptureDto) => {
            if (err) reject(err);
            else resolve(res);
          },
        );
      });
    });
  }
}
