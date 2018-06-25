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
		try {
			switch(req.body.queryResult.action) {
				case 'showAvailable':
					return func.showAllUnborrowedBooks(db,req,res);
			}
		}catch (err) {
			console.log(err);
			return res.json({fulfillmentText: 'There was an error. :<'});
		}
	});


	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
