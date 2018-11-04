const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
// replace the value below with the Telegram token you receive from @BotFather
const token = '757693452:AAF54Ok_LdLIBUybK7eO-Rssw8WKbOChRgg';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/curs/, (msg) => {
 

  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Выберите валюту 🤑", {
		reply_markup: {
			inline_keyboard: [
				[
					{
						text: 'EUR',
						callback_data: 'EUR'
					},
					{
						text: 'USD',
						callback_data: 'USD'
					},
					{
						text: 'RUR',
						callback_data: 'RUR'
					},
					{
						text: 'BTC',
						callback_data: 'BTC'
					},
				]
			]
		}
	});
});


bot.on('callback_query', query => {
	const id = query.message.chat.id;

	request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', function(error, response, body) {
	
	const data = JSON.parse(body);
	const result = data.filter(item => item.ccy === query.data)[0];
	let md = 
` *${result.ccy} - ${result.base_ccy}* 
	Buy: _${result.buy}_ 
	Sale: _${result.sale}_ `;
	bot.sendMessage(id, md, {parse_mode: 'Markdown'});
	});
})


