import { requiredMySQLConfigFields } from "./constants";

type MySQLConfigType = {
	host: String,
	user: String,
	password: String,
	database: String
};

/**
 * Base class
 */
module.exports = class Backup {

	mySqlConfig: MySQLConfigType;

	constructor(_config: Object) {
		let validated = this.validateConfig(_config);
		if (!validated) return;

	}

	/**
	 * Helper method to validate a MySQL connection config object and return a constructed MySQLConfig type
	 * @param config MySQL connection config object
	 * @returns Constructed MySQLConfig type
	 */
	validateConfig(configObject: any): boolean {
		// Check for invalid keys or invalid types
		const errors: Array<Error> = Object.keys(configObject)
			.filter(key => {
				!requiredMySQLConfigFields.includes(key) || configObject[key as keyof typeof configObject]! instanceof String
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

}

// module.exports = Backup;
// export const backup = new Backup();