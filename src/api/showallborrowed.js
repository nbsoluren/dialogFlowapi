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

		return res.json({
			"fulfillmentMessages": [
				{
				  "platform": "FACEBOOK",
				  "card": {
					"title": rows[0].name,
					"subtitle": rows[0].name,
					"imageUri": rows[0].author,
					"buttons": [
					  {
						"text": "Watch video",
						"postback": 'https://www.youtube.com/watch?v=' + rows[0].name
					  }
					]
				  }
				},
			]
			

			   
						
		});
	});
}