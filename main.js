var http = require('http');
    Discord = require('discord.js');
    OverBOTch = require('./overBOTch/index.js');
    Lootbox = require('./overBOTch/lootbox.js');
    Chuck = require('./overBOTch/chuck.js');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Node Running!\n');
}).listen(8000, '127.0.0.1');

var responseObject = {
  "ayy": "Ayy, lmao!",
  "gg": "gjglgdaws!",
  "lol": "roflmaotntpmp"
};

var bot = new Discord.Client();
var overB = new OverBOTch;

bot.on("message", (message) =>
{
   // console.log(message.author.id)
   console.log(message.author.id)
    var lowerMes = message.content.toLowerCase();
    if(lowerMes in responseObject && message.author.id !== '227490034582814731') {
        message.channel.sendMessage(responseObject[lowerMes]);
    }
    if (typeof overB.loadKeywords() !== 'undefined' && overB.loadKeywords().length > 0) {
        
        overB.checkMessageForKeywords(message.content, overB.loadKeywords(), function(keyword)
        {
            if (keyword != 0) {
                overB.runKeywordFunction(overB.getKeyByValue(overB.keywords, keyword), keyword, message, function(reply)
                {
                    message.channel.sendMessage(reply);
                });
            }
        });
    }
});


bot.on('ready', () => {
  console.log('I am ready on '+ bot.channels.size +' channel(s)!');
});



bot.on('disconnected', function () {
    console.log('Disconnected.');
    process.exit(1);
});


bot.login("MjI3NDkwMDM0NTgyODE0NzMx.CsG8KA.7IaNAZWMZuij8B6MPUzwxPb80oQ");
