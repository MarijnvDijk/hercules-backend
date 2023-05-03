import { MysqlError } from "mysql";

import BaseCrudRepository from "./base/BaseCrudRepository";

export default class GeoLocationRepository extends BaseCrudRepository {
    constructor() {
        super('geolocation');
    }
}