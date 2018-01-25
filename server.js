

//Remember: go to 'http://localhost:8081/scrape' to see the magic happen.



var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function (req, res){

	//scrapin starts here

	url = 'http://www.dictionary.com/list/a/1';

/*
	var urlNum = 0;
	url = 'http://www.dictionary.com/list/a/' + (urlNum)
	*/



	//request call structure
	//first parameter is url
	//callback function takes 3 parameters: error, response status code, the html

	request(url, function(error, response, html){

		//check for errors while page is requested
		if(!error) {
			//use cheerio library on the returned html; basically jQuery

			var $ = cheerio.load(html);

			//define variables

			var word;
			var json = { 
				word : [] 
			};
/*


			$('.words-list').filter(function(){
				//store filtered data in variable

				var stuff = $(this);

				//navigate to what you need
				//start at words-list > chil > 1st - ul > chil > 1s - li > chil > 1st - word > chil > 1st - a > text of <a> tag 
				word = stuff.children().first().children().first().children().first().children().first().text();

				//store in object
				json.word = word;

			


				fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

				console.log('Success! - Look for project.json file.')
		})


			}) */

			$('.word').each(function(i) {

					//word = $(this).text();
					json.word.push($(this).text());
					
					//console.log(i + " " + $(this).text() );

					//store in object
					//json.word = word;
					console.log(json.word);


					fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
					
				
		})

				});

					console.log('Success! - Look for project.json file.');
		}

		//write to system using fs (filesharing library)
		//pass 3 parameters to the writeFile function
		//parameter 1: output.json - name of exported file
		//parameter 2: JSON.stringify(json, null 4) - data to write. JSON.stringify makes it easier to read
		//parameter 3: callback function - lets us know status of function

	
		//send message to browser - app has no UI
		res.send('Check console')
	
	}) ;

})

app.listen('8081')
console.log('Scraping stuff at port 8081');
exports = module.exports = app;