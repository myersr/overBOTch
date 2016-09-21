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
