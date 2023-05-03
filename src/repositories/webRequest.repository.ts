import { MysqlError } from "mysql";

import BaseCrudRepository from "./base/BaseCrudRepository";

export default class WebRequestRepository extends BaseCrudRepository {
    constructor() {
        super('webRequest');
    }
}