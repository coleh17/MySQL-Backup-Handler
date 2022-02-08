"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
/**
 * Base class
 */
module.exports = class Backup {
    /**
     * Constructor for Backup class, validates and initializes data
     * @param _config MySQL Connection config
     * @param _outputMode Log program output in console
     * @param _debugMode Log debug output in console
     */
    constructor(_config, _outputMode, _debugMode) {
        /**
         * Helper method to set the output webhook
         * @param url Webhook URL
         */
        this.setWebhook = (url) => {
            if (this.isValidWebhookURL(url)) {
                this.webhookURL = url;
                this.sendDebugLog("Webhook set to: " + url);
            }
            else {
                this.sendDebugLog("Invalid webhook link provided!");
            }
        };
        /**
         * Helper method to return current webhook URL
         * @returns Webhook URL
         */
        this.getWebhook = () => {
            return this.webhookURL;
        };
        /**
         * Enables webhook
         */
        this.enableWebook = () => {
            this.webhookMode = true;
        };
        /**
         * Disables webhook
         */
        this.disableWebook = () => {
            this.webhookMode = false;
        };
        /**
         * @returns If webhook is active
         */
        this.isWebhookEnabled = () => {
            return this.webhookMode;
        };
        /**
         * Helper method to log output to console
         * @param message Message to log out
         */
        this.sendOutputLog = (message) => {
            if (this.outputMode) {
                console.log(`[MySQL Backup Log] ${message}`);
            }
        };
        /**
         * Helper method to log debug output to console
         * @param message Debug message to log out
         */
        this.sendDebugLog = (message) => {
            if (this.debugMode) {
                console.log(`[MySQL Backup Debug Log] ${message}`);
            }
        };
        /**
         * Helper method to determine if URL is a valid discord.com webhook URL
         * @param url Webhook URL
         * @returns boolean if URL is a valid webhook URL
         */
        this.isValidWebhookURL = (url) => {
            var pattern = new RegExp('^(https:\/\/discordapp.com\/api\/webhooks\/[0-9]{17,20}\/[a-z,A-Z,0-9,_]{60,75})');
            return pattern.test(url);
        };
        let validated = this.validateConfig(_config);
        if (!validated)
            return;
        this.outputMode = _outputMode;
        this.debugMode = _debugMode;
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
            return !constants_1.requiredMySQLConfigFields.includes(key) || typeof configObject[key] != 'string';
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
                this.sendDebugLog(err.message);
            }
            this.sendDebugLog("Invalid MySQL Config");
            return false;
        }
        // If keys are valid, set class config to new MySQLConfigType with config data
        else {
            this.mySqlConfig = {
                host: configObject.host,
                user: configObject.user,
                password: configObject.password,
                database: configObject.database
            };
            this.sendDebugLog("MySQL Config Validated");
            return true;
        }
    }
};
