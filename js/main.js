document.body.onload = function() {

	setTimeout(function(){
		var preloader = document.querySelector('.preloader');
		if( !preloader.classList.contains('preloader__done'))
		{
			preloader.classList.add('preloader__done');
		}
	}, 1000);

	var map;

	DG.then(function () {
			map = DG.map('map', {
					center: [48.45, 35.0],
					zoom: 11,
					maxBounds: [
						[48.0, 34.0],
						[49.0, 36.0]
					],
					minZoom: 9,
			});

		DG.control.location({position: 'bottomright'}).addTo(map);
		DG.control.scale().addTo(map);
		DG.control.ruler({position: 'bottomleft'}).addTo(map);
		DG.control.traffic().addTo(map);
			
	});

	function getDate() {
		const date = new Date();
		const month = date.getMonth();
		const day = date.getDate();

		const monthArray = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

		const actualDate = `${monthArray[month]} ${day}`;

		document.querySelector('.date').innerHTML = actualDate;
	}

	getDate();

	async function weather() {

		let icoDiv = document.querySelector('.ico');
		let descriptionDiv = document.querySelector('.description');
		let currentTempDiv = document.querySelector('.current-temp');
		let minTempDiv = document.querySelector('.min-temp');
		let maxTempDiv = document.querySelector('.max-temp');

		let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Dnipro&lang=ru&appid=64b842bc5c15ff3d37a1f815e7b3bf55');
		let data = await response.json();

		let weatherIco = data.weather[0].icon;
		icoDiv.innerHTML = `<img src="https://openweathermap.org/img/w/${weatherIco}.png">`;

		let weatherDescription = data.weather[0].description;
		descriptionDiv.innerHTML = weatherDescription;

		let temp = Math.round(data.main.temp - 273);
		currentTempDiv.innerHTML =  temp + '&#176;C' ;

		let minTemp = Math.round(data.main.temp_min - 273);
		minTempDiv.innerHTML = '<i class="fas fa-long-arrow-alt-down"></i> ' + minTemp + '&#176;C' ;

		let maxTemp = Math.round(data.main.temp_max - 273);
		maxTempDiv.innerHTML = '<i class="fas fa-long-arrow-alt-up"></i> ' + maxTemp + '&#176;C' ;

	}

	weather();

	async function crypto() {

		let btcDiv = document.querySelector('.btc-price');
		let ethDiv = document.querySelector('.eth-price');
		let xrpDiv = document.querySelector('.xrp-price');
		let usdtDiv = document.querySelector('.usdt-price');
		let bchDiv = document.querySelector('.bch-price');
		let ltcDiv = document.querySelector('.ltc-price');

		let response = await fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP,USDT,BCH,LTC&tsyms=USD&api_key=872d2daf9f734d4e568f94419dd67cdcc19a688bf8ef6bc447b2bcbd0eb42c37 ');
		let data = await response.json();

		let btc = data.BTC.USD;
		btcDiv.innerHTML = Math.floor(btc * 100) / 100;

		let eth = data.ETH.USD;
		ethDiv.innerHTML = Math.floor(eth * 100) / 100;

		let xrp = data.XRP.USD;
		xrpDiv.innerHTML = Math.floor(xrp * 100) / 100;

		let usdt = data.USDT.USD;
		usdtDiv.innerHTML = Math.floor(usdt * 100) / 100;

		let bch = data.BCH.USD;
		bchDiv.innerHTML = Math.floor(bch * 100) / 100;

		let ltc = data.LTC.USD;
		ltcDiv.innerHTML = Math.floor(ltc * 100) / 100;

	}

	crypto();

	async function money() {

		let usdDiv = document.querySelector('.usd');
		let eurDiv = document.querySelector('.eur');
		let rubDiv = document.querySelector('.rub');

		let response = await fetch(' https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5 ');
		let data = await response.json();

		const currencyName = [];
		const currencyBuy = [];
		const currencySale = [];
		for(key in data){
			currencyName.push(data[key].ccy);
			currencyBuy.push(Math.floor(data[key].buy * 100) / 100);
			currencySale.push(Math.floor(data[key].sale * 100) / 100);
		}

		usdDiv.innerHTML = `<div class="name">${currencyName[0]}</div> <div class="buy">${currencyBuy[0]}</div> <div class="sale">${currencySale[0]}</div>`;
		eurDiv.innerHTML = `<div class="name">${currencyName[1]}</div> <div class="buy">${currencyBuy[1]}</div> <div class="sale">${currencySale[1]}</div>`;
		rubDiv.innerHTML = `<div class="name">${currencyName[2]}</div> <div class="buy">${currencyBuy[2]}</div> <div class="sale">${currencySale[2]}</div>`;

	}

	money();

	async function news() {

		let newsDiv = document.querySelector('.news');

		let response = await fetch('https://newsapi.org/v2/top-headlines?country=ua&apiKey=c9b736f8e4da4e5aa80920dbef6738d8');
		let data = await response.json();

		data.articles.map(function(item) {
			let article = document.createElement('article');
			let text = document.createElement('div');
			text.classList.add('text');
			let imgDiv = document.createElement('div');
			imgDiv.classList.add('imgDiv');

			let link = document.createElement('a');
			link.classList.add('article-link');
			link.href = item.url;
			link.target = '_blank';
			link.innerHTML = item.title;

			let author = document.createElement('div');
			author.classList.add('author');
			author.innerHTML = item.author;

			let description = document.createElement('div');
			description.classList.add('description');
			description.innerHTML = item.description;

			let publishedAt = document.createElement('div');
			publishedAt.classList.add('publishedAt');
			publishedAt.innerHTML = item.publishedAt.slice(0, 10);
			
			let title = document.createElement('div');
			title.classList.add('title');
			title.innerHTML = item.title;

			let img = document.createElement('img');

			if (item.urlToImage === null) {
				img.src = 'img/news.jpg';
			} else {
				img.src = item.urlToImage;
			}

			text.append(link);			
			text.append(description);	
			text.append(author);		
			
			imgDiv.append(img);
			imgDiv.append(publishedAt);
			
			article.append(imgDiv);
			article.append(text);

			newsDiv.append(article);
		});

	}

	news();

	let tab = document.querySelectorAll('.tab-title');
	let tabContent = document.querySelectorAll('.tab-content');
	let tabContainer = document.querySelector('.tab-container');

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].style.display = 'none';
		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].style.display == 'none'){
			hideTabContent(0);
			tabContent[b].style.display = 'block';
		}
	}

	tabContainer.addEventListener('click', function(event) {
		let target = event.target;
		if (target.className == 'tab-title') {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					showTabContent(i);
					break;
				}
			}
		};
	});

}