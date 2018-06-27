import fetch from 'node-fetch';
export function showAllUnborrowedBooks(db, req, res) {
	const queryString = 'SELECT name, author, category FROM book WHERE isBorrowed IS FALSE';
    console.log("Im called");
	db.query(queryString, (err, rows) => {
		if(err) {
			console.log(err);
			return res.json({ fulfillmentText: 'There is an error D:' });
		}

		if(!rows.length) {
			return res.json({ fulfillmentText: 'There are no books. :<' });
		}

		var books = 'Here are the available books:';
		for(var i = 0; i < rows.length; i++) {
			books += '\n\n' + rows[i].name + '\nAuthor: ' + rows[i].author + '\nCategory: ' + rows[i].category;
		}

		return res.json({ fulfillmentText: books });
	});
}

export function showAllBorrowedBooks(db, req, res) {
	const queryString = 'SELECT name, author, category FROM book WHERE isBorrowed IS TRUE';
    console.log("Im called");
	db.query(queryString, (err, rows) => {
		if(err) {
			console.log(err);
			return res.json({ fulfillmentText: 'There is an error D:' });
		}

		if(!rows.length) {
			return res.json({ fulfillmentText: 'There are no books. :<' });
		}

		var books = 'Here are the borrowed books:';
		for(var i = 0; i < rows.length; i++) {
			books += '\n\n' + rows[i].name + '\nAuthor: ' + rows[i].author + '\nCategory: ' + rows[i].category;
		}

		return res.json({ fulfillmentText: books });
	});
}


export function borrowBook(db, req, res) {
	console.log("yo roight");
	//console.log(req.body.originalDetectIntentRequest.payload.data.sender.id);
	const params = req.body.queryResult.parameters;
	var queryString = 'SELECT isBorrowed FROM book WHERE name = ?';

	db.query(queryString, params.title, (err, rows) => {
		if(err) {
			console.log(err);
			return res.json({ fulfillmentText: 'Hmm. I might have misunderstood that. butts.' });
		}

		if(!rows.length) {
			return res.json({ fulfillmentText: 'Can\'t find that book in the library.' });
		}

		if(rows[0].isBorrowed){
			return res.json({ fulfillmentText: 'That book has already been borrowed' });
		}

		queryString = 'UPDATE book SET isBorrowed = ? WHERE name= ?';
		const values = [1, params.title];
		
		db.query(queryString, values, (err, rows) => {
			if(err) {
				console.log(err);
				return res.json({ fulfillmentText: 'Hmm. I might have misunderstood that 👾 Please say it more properly 😁' });
			}


			var body = { 
				"messaging_type": "update",
				"recipient": {
				"id": "1716566581793299"
				},
				"message": {
				"text": "hello, world!"
				}
			 };
			fetch('"https://graph.facebook.com/v2.6/me/messages?access_token="https://graph.facebook.com/v2.6/me/messages?access_token=EAANxl0AfLbwBAOKTYmFv86iV2TSovhZCPCu5RrWCReRKXnUo6Ls9B7zdjdobzmtfcwtJkXbIejmAXvJjn7lBZAcE2eY87zwNxTZCCAOvR6LKcaDS8YTzQZCguTPzfsLevbdCCeKTiGVFQlkkx2yEjUUYi8LrTu6uxMiP90CbavSSEcIom8Da', { 
				method: 'POST',
				body:    JSON.stringify(body),
				headers: { 'Content-Type': 'application/json' },
			})
				.then(res => res.json())
				.then(json => console.log(json));

			return res.json({ fulfillmentText: `You borrowed ${params.title}` });
		});
	});
}

export function returnBook(db, req, res) {
	const params = req.body.queryResult.parameters;
	var queryString = 'SELECT isBorrowed FROM book WHERE name = ?';

	db.query(queryString, params.title, (err, rows) => {
		if(err) {
			console.log(err);
			return res.json({ fulfillmentText: 'Hmm. I might have misunderstood that. butts. labyu' });
		}

		if(!rows.length) {
			return res.json({ fulfillmentText: 'Can\'t find that book in the library.' });
		}

		if(!rows[0].isBorrowed){
			return res.json({ fulfillmentText: 'That book has already been returned' });
		} 

		queryString = 'UPDATE book SET isBorrowed = ? WHERE name= ?';
		const values = [0, params.title];
		
		db.query(queryString, values, (err, rows) => {
			if(err) {
				console.log(err);
				return res.json({ fulfillmentText: 'There seems to be an internal error.' });
			}
			return res.json({ fulfillmentText: `Return book ${params.title}` });
		});

	});
}

export function searchBook(db, req, res) {

	const params = req.body.queryResult.parameters;
	var author = params.author;
	var title = params.title;
	title = '%' +  title + '%'
	var category = params.category;

	if(params.author == ' ') author = '%';
	else author = '%' +  author + '%'
	if(params.category == ' ') category = '%';
	else category = '%' +  category + '%'

	var values = [title, author, category];

	var queryString = 'SELECT name, author, category, isBorrowed FROM book WHERE name LIKE ? AND author LIKE ? AND category LIKE ?';

	db.query(queryString, values, (err, rows) => {
		if(err) {
			console.log(err);
			return res.json({ fulfillmentText: 'Hmm. I might have misunderstood that. butts. labyu' });
		}

		if(!rows.length) {
			return res.json({ fulfillmentText: 'Can\'t find that book in the library.' });
		} 
		
		return res.json({ fulfillmentText: 'Book Name: ' + rows[0].name + '\n Book Author: '+ rows[0].author + '\nBook Category: ' + rows[0].category + '\nStatus: '+ rows[0].isBorrowedoeiahesteirsntiei});

	});
}


export function pushNotif(db, req, res) {
	
		var body = { 
			"messaging_type": "update",
			"recipient": {
			"id": "1716566581793299"
			},
			"message": {
			"text": "hello, world!"
			}
		 };
		fetch('"https://graph.facebook.com/v2.6/me/messages?access_token="https://graph.facebook.com/v2.6/me/messages?access_token=<PAGE_ACCESS_TOKEN>', { 
			method: 'POST',
			body:    JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' },
		})
			.then(res => res.json())
			.then(json => console.log(json));
}

