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

			return res.json({ fulfillmentText: 'Here\'s your book butt.' });
		});
	});
}
