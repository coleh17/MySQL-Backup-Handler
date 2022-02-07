type MySQLConfigType = {
  host: String,
  user: String,
  password: String,
  database: String
};

/**
 * Base class
 */
class Backup {

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
    const errors: Array<Error> = Object.keys(configObject)
      .filter(key => {
        !requiredMySQLConfigFields.includes(key) || configObject[key as keyof typeof configObject]! instanceof String
      })
      .map(key => {
        return new Error(`${key} is an invalid MySQL Config key.`)
      })

    if (errors.length) {
      for (const err of errors) {
        console.log(err.message);
      }
      return true;
    }
    else {
      this.mySqlConfig = {
        host: configObject.host,
        user: configObject.user,
        password: configObject.password,
        database: configObject.databse
      };
      return false;
    }
  }

}

const requiredMySQLConfigFields = [
  "host",
  "user",
  "password",
  "database",
];