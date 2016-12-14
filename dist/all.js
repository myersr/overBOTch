var env = require('../config.json');

var HelpModule = function () {
    this.keywords = env.keywords;
};

HelpModule.prototype.getKeywords = function()
{
    var result = [];
    for (var i in this.keywords) {
        if (this.keywords.hasOwnProperty(i)) {
            result.push(this.keywords[i]);
        }
    }
    return result;
}

HelpModule.prototype.Message = function(keywords, message, callback)
{
    var words = '\n   '+ this.getKeywords() + '';
    return callback("overBOTch Commands: " + words.split(',').join(',\n   '));
}

module.exports = HelpModule;

var env = require('../config.json');
const https = require('https');

var Chuck = function () {
   this.users = env.users
};

Chuck.prototype.Message = function(keywords, message, callback)
{
     var words = 'chuck';
     var promiseCall = new Promise(
       function(resolve, reject){
         var resolved = getChuck();
         resolve( resolved );   
       }
    );
    promiseCall.then(
       function(val) {
//         console.log('Top Promise: ', val)
            return callback(val)
       }
    )

}

var url ='https://api.chucknorris.io/jokes/random';

var getChuck = function(battleId) {
    var promise1 = new Promise(
       function(resolve, reject){
         https.get(url, (res) => {
              res.on('data', (d) => {
              resolve(d);
            });
         }).on('error', (e) => {
            console.log('Promise Error: ',e);
            reject(e);
         });
       }
    )
    return promise1.then(
       function(val){
         console.log("resolve: ", val);
         var response = JSON.parse(val.toString());
         return( response.value )
       }, function (err) {
        console.log(err) // if readFile was unsuccessful, let's log it but still readAnotherFile
        return 'Sorry, I fucked up bad.'
        }
   ).catch(
      function(reason){
         console.log('Handle rejected promise ('+reason+') here.');
         return 'Sorry I fucked up.'
      }
    )
}

module.exports = Chuck;


var env = require('../config.json');

var CollectModule = function (){
   this.
}



var env = require('../config.json');
    Help = require('./Help.js');
    Lootbox = require('./lootbox.js');
    Chuck = require('./chuck.js');
    Ron = require('./ron.js');

var OverBOTch = function () {
   this.keywords = env.keywords;
   this.Help = new Help;
   this.Lootbox = new Lootbox;
   this.Chuck = new Chuck;
   this.Ron = new Ron;
};


OverBOTch.prototype.loadKeywords = function (){
    var result = [];
    for (var i in this.keywords) {
        if (this.keywords.hasOwnProperty(i)) {
            result.push(this.keywords[i]);
        }
    }
    return result;
}

OverBOTch.prototype.checkMessageForKeywords = function(message, triggers, callback){
    for(var i = 0; i != triggers.length; i++) {
        var substring = triggers[i];
        if (message.indexOf(substring) == 0) {
            return callback(substring);
        }
    }
    return callback(0);
}


OverBOTch.prototype.getKeyByValue = function(object, value)
{
    for(var prop in object) {
        if(object.hasOwnProperty(prop)) {
            if(object[prop] == value)
                return prop;
        }
    }
}

OverBOTch.prototype.runKeywordFunction = function(keywordFunction, keyword, message, callback)
{
    this[keywordFunction].Message(keyword, message, callback);
}

module.exports = OverBOTch;

//swoletrgeist #1323
//https://api.lootbox.eu/

var env = require('../config.json');

var Lootbox = function () {
   this.users = env.users
};

var bNets = {
    "213124335110455296":"swoletrgeist-1323", 
    "201538955047469058":"KickPuncher-1383",
    "13":"Veid-1290"
}

      


Lootbox.prototype.getUser = function(dID){
   if(dID in bNets){
      return bNets[String(dID)];
   }else{
      return "User not in our records";
   }
}

Lootbox.prototype.getUsers = function(){
    var result = [];
    for (var i in this.users) {
        if (this.keywords.hasOwnProperty(i)) {
            result.push(this.keywords[i]);
        }
    }
    return result;
}

Lootbox.prototype.Message = function(keywords, message, callback){
    var battleId = this.getUser(message.author.id);
    
    //profileString = getProfile(battleId);
    //console.log('before return')
    var contentArr = message.content.split(' ');
    console.log(contentArr)
    var promiseCall = new Promise(
       function(resolve, reject){
         var resolved = '';
         switch (contentArr.length > 2){
            case false:
                 resolved = getProfile(battleId);
                 break;
            case true:
                 switch(contentArr[1]){
                    case 'hero':
                         resolved = getHero(battleId,contentArr[2]);
                         break;
                    case 'heroes':
                         resolved = getHeroStats(battleId);
                         break;
                   }
                 break;
            default:
                 resolved = 'Mistake in switch';
            }
         resolve( resolved );   
       }
    );
    promiseCall.then(
       function(val) {
//         console.log('Top Promise: ', val)
         return callback(val)
       }
    )

    //return callback(profileString);
}



const https = require('https');

var options = {
  hostname: 'https://api.lootbox.eu',
  header: 'Accept: application/json',
  method: 'GET'
};
var url = 'https://api.lootbox.eu/pc/us/';

userTag = 'swoletrgeist-1323';

var getProfile = function(battleId) {
    url2 = url+battleId+'/profile';
    var promise1 = new Promise(
       function(resolve, reject){
         https.get(url2, (res) => {
            res.on('data', (d) => {
              resolve(d);
            });
         }).on('error', (e) => {
            console.log('Promise Error: ',e);
            reject(e);
         });
       }
    )
    return promise1.then(
       function(val){
         var getString = val.toString();
         var userData = JSON.parse(getString)
         var winR = '\n  Win/Loss Comp:\t'+userData.data.games.competitive.wins+ '/'+String(userData.data.games.competitive.lost);
         var compS = '\n  Rank:\t'+userData.data.competitive.rank;
         var userNS = "Username: " + userData.data.username;
         var life = '';
         if(userData.data.competitive.star){
            life = '\n  Life?:\t None.';
         }else{
            life = '\n  Life?:\t Has a life.';
         }
         return( userNS + compS + winR + life)
       }, function (err) {
        console.log(err) // if readFile was unsuccessful, let's log it but still readAnotherFile
        return 'Sorry, I fucked up bad.'
        }
   ).catch(
      function(reason){
         console.log('Handle rejected promise ('+reason+') here.');
         return 'Sorry I fucked up.'
      }
    )
}
    


var getHeroStats = function(battleId) {
    url2 = url+battleId+'/competitive-play/allHeroes/';
    var promise1 = new Promise(
       function(resolve, reject){
         https.get(url2, (res) => {
            res.on('data', (d) => {
              resolve(d);
            });
         }).on('error', (e) => {
            console.log('Promise Error: ',e);
            reject(e);
         });
       }
    )
    return promise1.then(
       function(val){
         var getString = val.toString();
         var heroData = JSON.parse(getString)
         var returnString = 'Your Hero stats are:';
         for(stat in heroData){
            returnString = returnString +'\n  '+ stat+': ' + heroData[String(stat)]
         }
         return( returnString )
       }, function (err) {
        console.log(err)
        return 'Sorry, I fucked up bad.'
        }
   ).catch(
      function(reason){
         console.log('Handle rejected promise ('+reason+') here.');
         return 'Sorry I fucked up.'
      }
    )
}

var heroArr = [
        'Torbjoern', 'Lucio', 'Soldier76', 'Reinhardt', 'Roadhog', 'Winston', 'Tracer', 'Hanzo', 'Reaper', 'Widowmaker', 'Mercy', 'Pharah',
         'Bastion', 'Symmetra', 'Zenyatta', 'Genji', 'McCree', 'Junkrat', 'Zarya', 'D.Va', 'Mei', 'Ana'
        ]


var matchDict = function(heroInput){
    var pos = 0;
    var matched = false;
    for( hero in heroArr ){
       if( heroArr[hero].toLowerCase().indexOf( heroInput.toLowerCase() ) > -1){
           matched = true;
           return hero;
       }
    }
    if( !matched ){
        return -2
    }
}

    


var getHero = function(battleId, heroInput) {            
    url2 = url+battleId+'/competitive-play/hero/';
    pos = matchDict(heroInput);
    
    if( pos >= 0 ){
       url2 = url2+ heroArr[pos] + '/';
    }else{
       return "Sorry, I coudn't match that hero. Try the first 3-4 letters of the name."
    }
    console.log(pos)
    var promise1 = new Promise(
       function(resolve, reject){
         https.get(url2, (res) => {
            res.on('data', (d) => {
              resolve(d);
            });
         }).on('error', (e) => {
            console.log('Promise Error: ',e);
            reject(e);
         });
       }
    )
    return promise1.then(
       function(val){
         var getString = val.toString();
         var heroData = JSON.parse(getString)
         var returnString = heroArr[pos] + ': ';
         for(stat in heroData[heroArr[pos]]){
            returnString = returnString +'\n  '+ stat+': ' + heroData[heroArr[pos]][stat]
         }
         return( returnString )
       }, function (err) {
        console.log(err)
        return 'Sorry, I fucked up bad.'
        }
   ).catch(
      function(reason){
         console.log('Handle rejected promise ('+reason+') here.');
         return 'Sorry I fucked up.'
      }
    )
}

module.exports = Lootbox;

var env = require('../config.json');
const https = require('http');

var Ron = function () {
   this.users = env.users
};

Ron.prototype.Message = function(keywords, message, callback)
{
     var words = 'ron';
     var promiseCall = new Promise(
       function(resolve, reject){
         var resolved = getRon();
         resolve( resolved );   
       }
    );
    promiseCall.then(
       function(val) {
           var quote = "`**Ron Swanson ~ ***\""
           quote = quote + val + "\"***`"
           return callback(quote)
       }
    )

}

var url ='http://ron-swanson-quotes.herokuapp.com/v2/quotes';

var getRon = function(battleId) {
    var promise1 = new Promise(
       function(resolve, reject){
         https.get(url, (res) => {
              res.on('data', (d) => {
              resolve(d);
            });
         }).on('error', (e) => {
            console.log('Promise Error: ',e);
            reject(e);
         });
       }
    )
    return promise1.then(
       function(val){
         var response = JSON.parse(val.toString());
         return( response )
       }, function (err) {
        console.log(err) // if readFile was unsuccessful, let's log it but still readAnotherFile
        return 'Sorry, I fucked up bad.'
        }
   ).catch(
      function(reason){
         console.log('Handle rejected promise ('+reason+') here.');
         return 'Sorry I fucked up.'
      }
    )
}

module.exports = Ron;

