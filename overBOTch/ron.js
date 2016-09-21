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

