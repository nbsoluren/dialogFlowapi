import mysql from 'mysql';
import config from './config';
export default callback => {

	const db = mysql.createConnection(config.db);

	db.connect ( err => {
		if (err) {
			console.log("Error connecting to database.")
		}
		else{
			console.log("Success connecting to database.")
		}
	});

	db.query('USE DialogFlow');


	// connect to a database if needed, then pass it to `callback`:
	callback(db);
}
