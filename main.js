'use strict'

const urls = require('./urls');
const request = require('request');
const cheerio = require('cheerio');
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
		let rarity = $infos.eq(0).text();
		let set = $infos.eq(1).text();
		let number = $infos.eq(2).text().replace(/(\/[0-9])\w+/, '');

	    cards.push({
	    	title: $title.text(),
	    	src: $image.attr('src'),
	    	number: number,
	    	rarity: rarity,
	    	set: set
	    });

		console.log('title', $title.text());
		console.log('number', number);
	  }
	});
}