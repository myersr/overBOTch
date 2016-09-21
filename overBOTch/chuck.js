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

