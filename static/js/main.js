function OpenBooster() {
	this.init = function () {
		var self = this;

		this.booster.onsubmit = function (e) {
			e.preventDefault();
			self.cardList.innerHTML = '';

			for (var i = 0; i < self.cardsPerBosster; i++) {
				self.randomRarity();
			}
		}
	}

	this.randomize = function (max) {
		return parseInt(Math.random() * (max - 0));
	}

	this.randomRarity = function () {
		var rnd = Math.random();
		var index = 0;
		var raritys = {
			common: 1,
			uncommon: .15,
			rare: .04,
			secret: .01
		}

		if (rnd <= raritys.secret) {
			index = this.randomize(this.types.secret.length - 1);
			this.creadeCard(this.types.secret[index]);
		}
		else if (rnd <= raritys.rare) {
			index = this.randomize(this.types.rare.length - 1);
			this.creadeCard(this.types.rare[index]);
		}
		else if (rnd <= raritys.uncommon) {
			index = this.randomize(this.types.uncommon.length - 1);
			this.creadeCard(this.types.uncommon[index]);
		}
		else if (rnd <= raritys.common) {
			index = this.randomize(this.types.common.length - 1);
			this.creadeCard(this.types.common[index]);
		}
	}

	this.creadeCard = function (item) {
		var card = document.createElement('li');
		var img = document.createElement('img');
		var title = document.createElement('p');
		card.appendChild(img);
		card.appendChild(title);
		card.classList.add('booster__card')

		img.src = item.src;
		title.innerHTML = item.title + ' [' + item.rarity + '] - (' + item.number + ')';

		this.cardList.appendChild(card);
	}

	this.checkPercentage = function () {
		var _types = {
			rare: [],
			common: [],
			uncommon: [],
			secret: []
		}

		cards.forEach(function (card) {
			if (card.rarity === 'Rare')
				_types.rare.push(card);
			else if (card.rarity === 'Common')
				_types.common.push(card);
			else if (card.rarity === 'Uncommon')
				_types.uncommon.push(card);
			else if (card.rarity === 'Secret Rare')
				_types.secret.push(card);
		});

		return _types;
	}

	this.cardList = document.querySelector('.booster__cards');
	this.booster = document.querySelector('.booster');
	this.cardsPerBosster = 5;
	this.types = this.checkPercentage();
}

var openBosster = new OpenBooster();
openBosster.init();