const qrcode = require('qrcode-terminal');

const { Client, MessageContent, Buttons, Payment, Message, MessageTypes, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new LocalAuth()
});

let tipo = "";

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message_reaction', (message) => {
  console.log('O CARA REAGIU A MENSAGEM', message)
})
client.on('message', (message) => {
  console.log('MESSAGE RECEIVED', message)

  message.getChat().then(chat => {
    console.log('chat', chat)
    
    // chat.fetchMessages().then(messages => {
    //   for (let i = 0; i < messages.length; i++) {
    //     console.log('mensagem i', messages[i].body)
        
    //   }
    // })

    if (chat.isGroup && chat.name === 'Rumo ao Ouaaaaro') {
      client.sendMessage(message.from, 'teste 1')
    }
  })
  console.log('escolha a opção')


	if(message.body === '!ping') {
    console.log('ping', message);
    this.tipo = "ping";
		client.sendMessage(message.from, 'pong');
	} else  if (message.body === "central" || message.body === "Central" || message.body === "geral" || message.body === "Geral") {
    let button = new Buttons('Escolha o comodo desejado:',[{body:'Sala'},{body:'Cozinha'}, {body:'Quarto'}, {body:'Geral'}],'title','footer');
    client.sendMessage(message.from, button);
    
  } else if (message.body === "Sala" || message.body === "sala"){
    let button = new Buttons('Escolha o comodo desejado:',[{body:'Sala'},{body:'Cozinha'}, {body:'Quarto'}, {body:'Geral'}],'title','footer');
    client.sendMessage(message.from, button);
  } else if(message.body === "pagar"){
    let pagar = new Payment({id: {fromMe: true},paymentAmount1000: 1000, paymentCurrency: 'BRL'})
    let mensagem = new Message({type: MessageTypes.PAYMENT, body: pagar})
    client.sendMessage(message.from, mensagem);
  }
});
 

client.initialize();
