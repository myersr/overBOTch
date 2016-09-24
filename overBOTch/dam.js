var env = require('../config.json');

var DamMod = function () {
    this.keywords = env.keywords;
};

var heroArr = [
        'Torbjoern', 'Lucio', 'Soldier76', 'Reinhardt', 'Roadhog', 'Winston', 'Tracer', 'Hanzo', 'Reaper', 'Widowmaker', 'Mercy', 'Pharah',
         'Bastion', 'Symmetra', 'Zenyatta', 'Genji', 'McCree', 'Junkrat', 'Zarya', 'D.Va', 'Mei', 'Ana'
        ]

var heroArr = {
        'Torbjoern':{
            'RivetGun': '  70 - Projectile',
            'Shotgun-Alt': '  6-15 x 10 - Projectile',
            'Hammer': '  75',
            'Turret': '  14 per round 14 per second - Hitscan',
            'Ult': '  Plus 600 health/armour + 50% fire rate'
        }, 'Lucio':{
        	'Amplifier': '  16 per projectile',
        	'Soundwave': '  25',
        	'Ult': '  500 health for 6 Seconds'
        }, 'Soldier76':{
        	'Rifle': '  5-17 Hitscan',
        	'Rockets': '  120 Projectile',
        	'Ult': '    6 Seconds'
        }, 'Reinhardt':{
        	'Hammer': '  75',
        	'Charge': '    50 init 300 on Pin',
        	'FireStrike': '  100 Projectile',
        	'Ult': '  50 2.5 Seconds'
        }, 'Roadhog':{
        	'CloseShot': '  2-9 per Pellet 25 Pellets - Projectile',
        	'FarShot': '  50 before burst same as CloseShot after burst - Projectile',
        	'Chain': '  30 on Hook 20 meter range',
        	'WholeHog': '  Rapid Shotgut at 5000 over 6 Seconds'
        }, 'Winston':{
        	'Tesla': '  60 per second for 5 Seconds',
        	'Jump': '  50 on land - 18-22 meters',
        	'Barrier': '  800 health',
        	'Ult': '   plus 500 health - 40 per swing for 10 Seconds - 2 sec jump cooldown'
        }, 'Tracer':{
        	'Pistol': '  1.5-6 per 40 rounds a second - Hitscan',
        	'Ult': '  400 with 3 meter radius'
        }, 'Hanzo':{
        	'Bow': '  125 Full - 29 Not charged - Projectile',
        	'Scatter': '  Same as bow initial shot 75 per bounce arrow - Projectile',
        	'Ult': '  Same as bow intial shot 200 per second in dragons - Projectile'
        }, 'Reaper':{
        	'Heal': '  50 per globe',
        	'Hellfire': '  2-7 per 20 pellet shot - Projectile',
        	'Wraith': '  3 Seconds',
        	'Ult': '  510 8 meter radius'
        }, 'Widowmaker':{
        	'Scope': '  120 - Hitscan',
        	'Unscoped': '  13 at 10 rounds per second - Hitscan',
        	'Poison': '  15 per second for 5 Seconds'
        }, 'Mercy':{
        	'Beam': '  plus 30% Damage plus 60 health a second',
        	'Pistol': '  20 with 5 shots a second - Projectile'
        }, 'Pharah':{
        	'Rocket': '  120 splash - Projectile',
        	'Ult': '  40 per Rocket 30 per second - Projectile'
        },'Bastion':{
        	'Unmounted': '  6-20 damage 8 per second - Hitscan',
        	'Mounted': '  4-5 damage 35 per second - Hitscan',
        	'Ult': '  Plus 300 health 205 damage - Projectile'
        }, 'Symmetra':{
        	'Beam': '  30/60/120 jump every one second',
        	'Ball': '  125 full 25 uncharged',
        	'Turret': '  25 per second',
        	'Ult': '  200 health 6 charges'
        }, 'Zenyatta':{
        	'Orb': '  46 - Projectile',
        	'Heal': '  30 per Second',
        	'Ult': '  300 per Second'
        }, 'Genji':{
        	'Shuriken': '  28 per Shuriken 3 per shot - Projectile',
        	'Fan': '  Same shit just wider',
        	'SwiftStrike': '  50 damage',
        	'Deflect': '  2 Seconds',
        	'Ult': '  120 damage for 6 swing per second'
        }, 'McCree':{
        	'Pistol': '  20-70 - Hitscan',
        	'Fan': '  22-45 - Hitscan',
        	'Flash': '  25 - Projectile',
        	'Ult': '  Charges 170 per 1 second so the weaker the opponents the quicker the charge - Hitscan'
        }, 'Junkrat':{
        	'2ndChance': '  60 per shot - Splash',
        	'Launcher': '  120 - 2 meter Splash',
        	'Mine': '  120 - Splash',
        	'Trap': '  80 damage 1 second stun 3 Second root',
        	'Ult': '  100 health 600 Damage'
        }, 'Zarya':{
        	'Energy': '  Plus 1% of damage per 1 Energy gained at 1 energy per 4 damage',
        	'Beam': '  ~90 per Second',
        	'Ball': '  45 - Projectile',
        	'Barrier': '  200 health or 50 energy',
        	'ExtBarrier': '  200 health or 50 energy',
        	'Ult': '  22 damage over the 4 seconds'
        }, 'D.Va':{
        	'Shotgun': '  .5-3 per pellet with 58 pellets a second',
        	'Matrix': '  4 seconds at 15 meters',
        	'Boosters': '  25 plus knockback',
        	'Pistol': '  14 at 6 per second - Hitscan',
        	'Ult': '  1000 after 3 seconds'
        }, 'Mei':{
        	'Beam': '  45 a second',
        	'Icicle': '  22-75 with fallout after 26 meters - Projectile',
        	'CryoFreeze': '  heals 150 duration of 4 seconds',
        	'Wall': '  500 health per pillar',
        	'Ult': '  97 damage over 5 seconds'
        }, 'Ana': {
        	'Rifle': '  80 damage or 75 healing - Histcan scoped Projectile unscoped',
        	'Sleep': '  5 damage 5.5 seconds of ball to face action',
        	'Grenade': '  60 damage or 100 health and plus 100% healing for 5 seconds or healing denial on enemies',
        	'Ult': '  Supercharge someone for +50% damage +50% reduction in damage +30% movement for 8 seconds'

        }
}


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


DamMod.prototype.getKeywords = function()
{
    var result = [];
    for (var i in this.keywords) {
        if (this.keywords.hasOwnProperty(i)) {
            result.push(this.keywords[i]);
        }
    }
    return result;
}

DamMod.prototype.Message = function(keywords, message, callback)
{
    var words = '\n   '+ this.getKeywords() + '';
    return callback("overBOTch Commands: " + words.split(',').join(',\n   '));
}

module.exports = DamMod;

