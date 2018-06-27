import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import 'babel-polyfill';
import * as func from './functions'

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	api.post('/webhook', async (req, res) => {
		console.log(res.body);
		try {
			switch(req.body.queryResult.action) {
				case 'returnBook':
					return func.returnBook(db,req,res);
					break;
				case 'showAvailable':
					return func.showAllUnborrowedBooks(db,req,res);
					break;
				case 'showBorrowed':	
					return func.showAllBorrowedBooks(db,req,res);
					break;
				case 'borrowBooks':
					return func.borrowBook(db,req,res);
					break;
				case 'searchBook':
					return func.searchBook(db,req,res);
					break;
			}
		}catch (err) {
			console.log(err);
			return res.json({fulfillmentText: 'There was an error. :< here!'});
		}
	});


	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
