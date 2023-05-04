import DatabaseConnection from '../database_connection';

export default class BaseCrudRepository {
  // Create base repository
  db: DatabaseConnection;

  tableName: string;

  constructor(tableName: string) {
    this.db = new DatabaseConnection();
    this.tableName = tableName;
  }
}
