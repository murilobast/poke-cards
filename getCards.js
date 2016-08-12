'use strict'

const urls = require('./urls');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
let cards = [];

for (var i =0; i< urls.length; i++) {
	pushCard(urls[i].href);
}

// pushCard(urls[0].href);

function pushCard(url) {
	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    let $ = cheerio.load(body);
		let $title = $('#columnLeft h1').first();
		$title.find('a').remove();
		let $image = $('.cardinfo .card img');
		let $infos = $('.infoblurb > div');
		$infos.find('strong').remove();
		let rarity = $infos.eq(0).text().replace(' ', '');
		let set = $infos.eq(1).text().replace(' ', '');
		let number = $infos.eq(2).text().replace(/(\/[0-9])\w+/, '').replace(' ', '');

	    cards.push({
	    	title: $title.text(),
	    	src: $image.attr('src'),
	    	number: number,
	    	rarity: rarity,
	    	set: set
	    });

		console.log('title', $title.text());
		console.log('number', number);
	    fs.writeFileSync('./static/js/cards.js', 'var cards = ' + JSON.stringify(cards, null, 2), 'utf-8'); 
	  }
	});
}