export type MySQLConfigType = {
	host: string,
	user: string,
	password: string,
	database: string
};

export type SFTPConfigType = {
	host: string,
	port: string,
	username: string,
	password: string
};

export interface ReturnObject {
	message: string,
	success: boolean
}