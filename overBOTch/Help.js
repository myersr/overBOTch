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
    var usageString = 'Commands: \n  !help:     Returns this command.\n  !achieve:    Return achievments in Overwatch\n'+
                     '  !stats:      Returns basic competitive stats for OVerwatch\n'+
                     '  !stat {Hero Name}:    Hero name must be one word, can be partial. Returns statistics on your account with that hero\n'
                    +'  !dam {Hero Name}:    Hero name one word, Returns hero damage.'
                    +'  !chuck:         Returns a Quote from a great man\n  !ron:                 Returns a quote from a great man';
    return callback(usageString);
}

module.exports = HelpModule;
