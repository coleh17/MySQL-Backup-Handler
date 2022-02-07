"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
/**
 * Base class
 */
module.exports = class Backup {
    constructor(_config) {
        let validated = this.validateConfig(_config);
        if (!validated)
            return;
    }
    /**
     * Helper method to validate a MySQL connection config object and return a constructed MySQLConfig type
     * @param config MySQL connection config object
     * @returns Constructed MySQLConfig type
     */
    validateConfig(configObject) {
        // Check for invalid keys or invalid types
        const errors = Object.keys(configObject)
            .filter(key => {
            !constants_1.requiredMySQLConfigFields.includes(key) || configObject[key] instanceof String;
        })
            .map(key => {
            return new Error(`${key} is an invalid MySQL config key.`);
        });
        // Check for missing keys
        if (Object.keys(configObject).sort().toString() != constants_1.requiredMySQLConfigFields.sort().toString()) {
            errors.push(new Error(`Missing values in MySQL config.`));
        }
        // If invalid keys found, display errors and exit
        if (errors.length) {
            for (const err of errors) {
                console.log(err.message);
            }
            return false;
        }
        // If keys are valid, set class config to new MySQLConfigType with config data
        else {
            this.mySqlConfig = {
                host: configObject.host,
                user: configObject.user,
                password: configObject.password,
                database: configObject.databse
            };
            return true;
        }
    }
};
// module.exports = Backup;
// export const backup = new Backup();
