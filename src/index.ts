import { requiredMySQLConfigFields } from "./constants";

type MySQLConfigType = {
	host: string,
	user: string,
	password: string,
	database: string
};

/**
 * Base class
 */
module.exports = class Backup {
	private mySqlConfig: MySQLConfigType;
	private outputMode: boolean;
	private debugMode: boolean;
	private webhookMode: boolean;
	private webhookURL: string;

	/**
	 * Constructor for Backup class, validates and initializes data
	 * @param _config MySQL Connection config
	 * @param _outputMode Log program output in console
	 * @param _debugMode Log debug output in console
	 */
	constructor(_config: Object, _outputMode: boolean, _debugMode: boolean) {
		let validated = this.validateConfig(_config);
		if (!validated) return;

		this.outputMode = _outputMode;
		this.debugMode = _debugMode;

	}

	/**
	 * Helper method to validate a MySQL connection config object and return a constructed MySQLConfig type
	 * @param config MySQL connection config object
	 * @returns Constructed MySQLConfig type
	 */
	private validateConfig(configObject: any): boolean {
		// Check for invalid keys or invalid types
		const errors: Array<Error> = Object.keys(configObject)
			.filter(key => {
				return !requiredMySQLConfigFields.includes(key) || typeof configObject[key] != 'string'
			})
			.map(key => {
				return new Error(`${key} is an invalid MySQL config key.`)
			})
		// Check for missing keys
		if (Object.keys(configObject).sort().toString() != requiredMySQLConfigFields.sort().toString()) {
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

	/**
	 * Helper method to set the output webhook
	 * @param url Webhook URL
	 */
	public setWebhook = (url: string): void => {
		if (this.isValidWebhookURL(url)) {
			this.webhookURL = url;
			this.sendDebugLog("Webhook set to: " + url);
		} else {
			this.sendDebugLog("Invalid webhook link provided!");
		}
	}

	/**
	 * Helper method to return current webhook URL
	 * @returns Webhook URL
	 */
	public getWebhook = (): string => {
		return this.webhookURL;
	}

	/**
	 * Enables webhook
	 */
	public enableWebook = (): void => {
		this.webhookMode = true;
	}

	/**
	 * Disables webhook
	 */
	public disableWebook = (): void => {
		this.webhookMode = false;
	}

	/**
	 * @returns If webhook is active
	 */
	public isWebhookEnabled = (): boolean => {
		return this.webhookMode;
	}

	/**
	 * Helper method to log output to console
	 * @param message Message to log out
	 */
	private sendOutputLog = (message: string) => {
		if (this.outputMode) {
			console.log(`[MySQL Backup Log] ${message}`);
		}
	}

	/**
	 * Helper method to log debug output to console
	 * @param message Debug message to log out
	 */
	private sendDebugLog = (message: string) => {
		if (this.debugMode) {
			console.log(`[MySQL Backup Debug Log] ${message}`);
		}
	}

	/**
	 * Helper method to determine if URL is a valid discord.com webhook URL
	 * @param url Webhook URL
	 * @returns boolean if URL is a valid webhook URL
	 */
	private isValidWebhookURL = (url: string): boolean => {
		var pattern = new RegExp('^(https:\/\/discordapp.com\/api\/webhooks\/[0-9]{17,20}\/[a-z,A-Z,0-9,_]{60,75})');
		return pattern.test(url);
	}
}