//swoletrgeist #1323
//https://api.lootbox.eu/

var env = require('../config.json');

var Lootbox = function () {
   this.users = env.users
};

var bNets = {
    "213124335110455296":"swoletrgeist-1323", 
    "12":"KickPuncher-1383",
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
    var promiseCall = new Promise(
       function(resolve, reject){
         var resolved = '';
         switch (contentArr.length){
            case 1:
                 resolved = getProfile(battleId);
                 break;
            case 2:
                 resolved = getHeroStats(battleId);
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
         //var life = '';
         /*if(userData.data.competitive.star){
            life = '\n  Life?:\t None.';
         }else{
            life = '\n  Life?:\t Has a life.';
         }*/
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
