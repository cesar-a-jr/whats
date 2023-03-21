const qrcode = require('qrcode-terminal');

const { Client, Buttons } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
  console.log('MESSAGE RECEIVED', message);

	if(message.body === '!ping') {
    console.log('ping', message);
		client.sendMessage(message.from, 'pong');
	} else  if (message.body === "central" || message.body === "Central" || message.body === "geral" || message.body === "Geral") {

    let button = new Buttons('Escolha o comodo desejado:',[{body:'Sala'},{body:'Cozinha'}, {body:'Quarto'}, {body:'Geral'}],'title','footer');
    client.sendMessage(message.from, button);

  } else if (message.body === "Sala" || message.body === "sala"){
    let button = new Buttons('Escolha o comodo desejado:',[{body:'Sala'},{body:'Cozinha'}, {body:'Quarto'}, {body:'Geral'}],'title','footer');
    client.sendMessage(message.from, button);
  }
});
 

client.initialize();
