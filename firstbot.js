/*
 _____ ___ ____  ____ _____ _           _      _
|  ___|_ _|  _ \/ ___|_   _| |__   ___ | |_   (_)___
| |_   | || |_) \___ \ | | | '_ \ / _ \| __|  | / __|
|  _|  | ||  _ < ___) || | | |_) | (_) | |_ _ | \__ \
|_|   |___|_| \_\____/ |_| |_.__/ \___/ \__(_)/ |___/
                                            |__/
				RC #3
	   A discord bot for FIRST Robotics
TODO Event ticker
TODO Ranking at event year + code
TODO Awards at event
TODO clean up code
*/
const Discord = require('discord.js');
const bot = new Discord.Client();
const token= '';
const initTBA = require('thebluealliance');
const tba = new initTBA('node-thebluealliance', 'Node.js wrapper library for the TBA v2 API', '1.1.1');

var d = new Date();
var realMonth = d.getMonth() + 1

bot.on('ready', () => {
//report startup time for bot
console.log("Bot started on " + realMonth + "/" + d.getDate() + " at " + d.getHours() + ":" + d.getMinutes());
});

// create an event listener for messages
bot.on('message', message => {
  //function that converts message format into api-readable event codes.
  function makeTBAMatchCode(year, event, matchType, matchSeries, matchNum) {
  		var matchCode = year + event.toLowerCase() + '_';

  	switch (matchType) {
  		case 'QUALS':
  			matchCode += 'qm' + matchSeries;
  			break;
  		case 'QUARTERS':
  			matchCode += 'qf' + matchSeries + 'm' + matchNum;
  			break;
  		case 'SEMIS':
  			matchCode += 'sf' + matchSeries + 'm' + matchNum;
  			break;
  		case 'FINALS':
  			matchCode += 'f1m' + matchSeries;
  			break;
  }
  		return matchCode;
  	}
  //switch statement for various abilities
  switch (message.content.toLowerCase()) {
    case 'water game':
    case 'watergame':
    case 'water game 2017':
    case 'pizzagame':
    case 'pizza game':
    case 'pizza game 2017':
         message.channel.sendMessage('confirmed');
      break;
    case 'what is next year\'s game?':
    case 'what will next year\'s game be?':
         message.channel.sendMessage('~~water~~ pizza game');
      break;
    case 'beach bots clutch':
         message.channel.sendMessage('https://gfycat.com/AstonishingSilentAmericankestrel');
      break;
    case 'robot roulette':
         message.channel.sendMessage('https://gifsound.com/?gfycat=ThirstyThirdAfricanparadiseflycatcher&v=PGNiXGX2nLU&s=61');
      break;
    case 'firstbot changelogs':
         message.channel.sendMessage('FIRSTbot RC3: New countdown to kickoff feature. Just ask `when is kickoff`. Now using discord.js v9');
      break;
    case 'FIRST Stronghold':
    case '2016 competition name':
    case 'what was the 2016 competition name':
    case 'what was the 2016 competition name?':
    case 'what was the 2016 competition?':
    case 'competition name in 2016?':
    case 'FRC competition for 2016':
    case 'FRC competition for 2016?':
    case 'FRC competition in 2016':
    case 'FRC competition in 2016?':
    case '2013-16 competition name':
    case 'what was the 2013-16 competition name':
    case 'what was the 2013-16 competition name?':
    case 'what was the 2013-16 competition?':
    case 'competition name in 2013-16?':
    case 'FRC competition for 2013-16':
    case 'FRC competition for 2013-16?':
    case 'FRC competition in 2013-16':
    case 'FRC competition in 2013-16?':
    case '2013-2016 competition name':
    case 'what was the 2013-2016 competition name':
    case 'what was the 2013-2016 competition name?':
    case 'what was the 2013-2016 competition?':
    case 'competition name in 2013-2016?':
    case 'FRC competition for 2013-2016':
    case 'FRC competition for 2013-2016?':
    case 'FRC competition in 2013-2016':
    case 'FRC competition in 2013-2016?':
        message.channel.sendMessage('FIRST Stronghold');
        message.channel.sendFile('./compPics/2016.png','2016.png','*FIRST STRONGHOLD'); //star to prevent bot from triggering itself
        break;
    case 'FIRST Recycle Rush':
    case '2015 competition name':
    case 'what was the 2015 competition name':
    case 'what was the 2015 competition name?':
    case 'what was the 2015 competition?':
    case 'competition name in 2015?':
    case 'FRC competition for 2015':
    case 'FRC competition for 2015?':
    case 'FRC competition in 2015':
    case 'FRC competition in 2015?':
    case '2014-15 competition name':
    case 'what was the 2014-15 competition name':
    case 'what was the 2014-15 competition name?':
    case 'what was the 2014-15 competition?':
    case 'competition name in 2014-15?':
    case 'FRC competition for 2014-15':
    case 'FRC competition for 2014-15?':
    case 'FRC competition in 2014-15':
    case 'FRC competition in 2014-15?':
    case '2014-2013 competition name':
    case 'what was the 2014-2015 competition name':
    case 'what was the 2014-2015 competition name?':
    case 'what was the 2014-2015 competition?':
    case 'competition name in 2014-2015?':
    case 'FRC competition for 2014-2015':
    case 'FRC competition for 2014-2015?':
    case 'FRC competition in 2014-2015':
    case 'FRC competition in 2014-2015?':
        message.channel.sendMessage('Recycle Rush');
        message.channel.sendFile('./compPics/2015.png','2015.png','RECYCLE RUSH');
        break;
    case 'FIRST Aerial Assist':
    case '2014 competition name':
    case 'what was the 2014 competition name':
    case 'what was the 2014 competition name?':
    case 'what was the 2014 competition?':
    case 'competition name in 2014?':
    case 'FRC competition for 2014':
    case 'FRC competition for 2014?':
    case 'FRC competition in 2014':
    case 'FRC competition in 2014?':
    case '2013-14 competition name':
    case 'what was the 2013-14 competition name':
    case 'what was the 2013-14 competition name?':
    case 'what was the 2013-14 competition?':
    case 'competition name in 2013-14?':
    case 'FRC competition for 2013-14':
    case 'FRC competition for 2013-14?':
    case 'FRC competition in 2013-14':
    case 'FRC competition in 2013-14?':
    case '2013-2014 competition name':
    case 'what was the 2013-2014 competition name':
    case 'what was the 2013-2014 competition name?':
    case 'what was the 2013-2014 competition?':
    case 'competition name in 2013-2014?':
    case 'FRC competition for 2013-2014':
    case 'FRC competition for 2013-2014?':
    case 'FRC competition in 2013-2014':
    case 'FRC competition in 2013-2014?':
        message.channel.sendMessage('Aerial Assist');
        message.channel.sendFile('./compPics/2014.png','2014.png','RECYCLE RUSH');
        break;
    case 'FIRST Ultimate Ascent':
    case '2013 competition name':
    case 'what was the 2013 competition name':
    case 'what was the 2013 competition name?':
    case 'what was the 2013 competition?':
    case 'competition name in 2013?':
    case 'FRC competition for 2013':
    case 'FRC competition for 2013?':
    case 'FRC competition in 2013':
    case 'FRC competition in 2013?':
    case '2012-13 competition name':
    case 'what was the 2012-13 competition name':
    case 'what was the 2012-13 competition name?':
    case 'what was the 2012-13 competition?':
    case 'competition name in 2012-13?':
    case 'FRC competition for 2012-13':
    case 'FRC competition for 2012-13?':
    case 'FRC competition in 2012-13':
    case 'FRC competition in 2012-13?':
    case '2012-2013 competition name':
    case 'what was the 2012-2013 competition name':
    case 'what was the 2012-2013 competition name?':
    case 'what was the 2012-2013 competition?':
    case 'competition name in 2012-2013?':
    case 'FRC competition for 2012-2013':
    case 'FRC competition for 2012-2013?':
    case 'FRC competition in 2012-2013':
    case 'FRC competition in 2012-2013?':
        message.channel.sendMessage('Ultimate Ascent');
        message.channel.sendFile('./compPics/2013.png','2013.png','ULTIMATE ASCENT');
        break;
    case 'FIRST Rebound Rumble':
    case '2012 competition name':
    case 'what was the 2012 competition name':
    case 'what was the 2012 competition name?':
    case 'what was the 2012 competition?':
    case 'competition name in 2012?':
    case 'FRC competition for 2012':
    case 'FRC competition for 2012?':
    case 'FRC competition in 2012':
    case 'FRC competition in 2012?':
    case '2011-12 competition name':
    case 'what was the 2011-12 competition name':
    case 'what was the 2011-12 competition name?':
    case 'what was the 2011-12 competition?':
    case 'competition name in 2011-12?':
    case 'FRC competition for 2011-12':
    case 'FRC competition for 2011-12?':
    case 'FRC competition in 2011-12':
    case 'FRC competition in 2011-12?':
    case '2011-2012 competition name':
    case 'what was the 2011-2012 competition name':
    case 'what was the 2011-2012 competition name?':
    case 'what was the 2011-2012 competition?':
    case 'competition name in 2011-2012?':
    case 'FRC competition for 2011-2012':
    case 'FRC competition for 2011-2012?':
    case 'FRC competition in 2011-2012':
    case 'FRC competition in 2011-2012?':
        message.channel.sendMessage('Rebound Rumble');
        message.channel.sendFile('./compPics/2012.png','2012.png','REBOUND RUMBLE');
        break;
    case 'FIRST Logomotion':
    case '2011 competition name':
    case 'what was the 2011 competition name':
    case 'what was the 2011 competition name?':
    case 'what was the 2011 competition?':
    case 'competition name in 2011?':
    case 'FRC competition for 2011':
    case 'FRC competition for 2011?':
    case 'FRC competition in 2011':
    case 'FRC competition in 2011?':
    case '2010-11 competition name':
    case 'what was the 2010-11 competition name':
    case 'what was the 2010-11 competition name?':
    case 'what was the 2010-11 competition?':
    case 'competition name in 2010-11?':
    case 'FRC competition for 2010-11':
    case 'FRC competition for 2010-11?':
    case 'FRC competition in 2010-11':
    case 'FRC competition in 2010-11?':
    case '2010-2011 competition name':
    case 'what was the 2010-2011 competition name':
    case 'what was the 2010-2011 competition name?':
    case 'what was the 2010-2011 competition?':
    case 'competition name in 2010-2011?':
    case 'FRC competition for 2010-2011':
    case 'FRC competition for 2010-2011?':
    case 'FRC competition in 2010-2011':
    case 'FRC competition in 2010-2011?':
        message.channel.sendMessage('Logomotion *Honoring Jack Kamen*');
        message.channel.sendFile('./compPics/2011.png','2011.png','LOGO MOTION');
        break;
    case 'FIRST Breakaway':
    case '2010 competition name':
    case 'what was the 2010 competition name':
    case 'what was the 2010 competition name?':
    case 'what was the 2010 competition?':
    case 'competition name in 2010?':
    case 'FRC competition for 2010':
    case 'FRC competition for 2010?':
    case 'FRC competition in 2010':
    case 'FRC competition in 2010?':
    case '2009-10 competition name':
    case 'what was the 2009-10 competition name':
    case 'what was the 2009-10 competition name?':
    case 'what was the 2009-10 competition?':
    case 'competition name in 2009-10?':
    case 'FRC competition for 2009-10':
    case 'FRC competition for 2009-10?':
    case 'FRC competition in 2009-10':
    case 'FRC competition in 2009-10?':
    case '2009-2010 competition name':
    case 'what was the 2009-2010 competition name':
    case 'what was the 2009-2010 competition name?':
    case 'what was the 2009-2010 competition?':
    case 'competition name in 2009-2010?':
    case 'FRC competition for 2009-2010':
    case 'FRC competition for 2009-2010?':
    case 'FRC competition in 2009-2010':
    case 'FRC competition in 2009-2010?':
        message.channel.sendMessage('Breakaway');
        message.channel.sendFile('./compPics/2010.png','2010.png','BREAKAWAY');
        break;
    case 'FIRST Lunacy':
    case '2009 competition name':
    case 'what was the 2009 competition name':
    case 'what was the 2009 competition name?':
    case 'what was the 2009 competition?':
    case 'competition name in 2009?':
    case 'FRC competition for 2009':
    case 'FRC competition for 2009?':
    case 'FRC competition in 2009':
    case 'FRC competition in 2009?':
    case '2008-09 competition name':
    case 'what was the 2008-09 competition name':
    case 'what was the 2008-09 competition name?':
    case 'what was the 2008-09 competition?':
    case 'competition name in 2008-09?':
    case 'FRC competition for 2008-09':
    case 'FRC competition for 2008-09?':
    case 'FRC competition in 2008-09':
    case 'FRC competition in 2008-09?':
    case '2008-2009 competition name':
    case 'what was the 2008-2009 competition name':
    case 'what was the 2008-2009 competition name?':
    case 'what was the 2008-2009 competition?':
    case 'competition name in 2008-2009?':
    case 'FRC competition for 2008-2009':
    case 'FRC competition for 2008-2009?':
    case 'FRC competition in 2008-2009':
    case 'FRC competition in 2008-2009?':
        message.channel.sendMessage('Lunacy');
        message.channel.sendFile('./compPics/2009.png','2009.png','LUNACY');
        break;
    case 'FIRST Overdrive':
    case '2008 competition name':
    case 'what was the 2008 competition name':
    case 'what was the 2008 competition name?':
    case 'what was the 2008 competition?':
    case 'competition name in 2008?':
    case 'FRC competition for 2008':
    case 'FRC competition for 2008?':
    case 'FRC competition in 2008':
    case 'FRC competition in 2008?':
    case '2007-08 competition name':
    case 'what was the 2007-08 competition name':
    case 'what was the 2007-08 competition name?':
    case 'what was the 2007-08 competition?':
    case 'competition name in 2007-08?':
    case 'FRC competition for 2007-08':
    case 'FRC competition for 2007-08?':
    case 'FRC competition in 2007-08':
    case 'FRC competition in 2007-08?':
    case '2007-2008 competition name':
    case 'what was the 2007-2008 competition name':
    case 'what was the 2007-2008 competition name?':
    case 'what was the 2007-2008 competition?':
    case 'competition name in 2007-2008?':
    case 'FRC competition for 2007-2008':
    case 'FRC competition for 2007-2008?':
    case 'FRC competition in 2007-2008':
    case 'FRC competition in 2007-2008?':
        message.channel.sendMessage('*FIRST Overdrive');
        message.channel.sendFile('./compPics/2008.png','2008.png','FIRST OVERDRIVE');
        break;
    case 'FIRST Rack N Roll':
    case '2007 competition name':
    case 'what was the 2007 competition name':
    case 'what was the 2007 competition name?':
    case 'what was the 2007 competition?':
    case 'competition name in 2007?':
    case 'FRC competition for 2007':
    case 'FRC competition for 2007?':
    case 'FRC competition in 2007':
    case 'FRC competition in 2007?':
    case '2006-07 competition name':
    case 'what was the 2006-07 competition name':
    case 'what was the 2006-07 competition name?':
    case 'what was the 2006-07 competition?':
    case 'competition name in 2006-07?':
    case 'FRC competition for 2006-07':
    case 'FRC competition for 2006-07?':
    case 'FRC competition in 2006-07':
    case 'FRC competition in 2006-07?':
    case '2006-2007 competition name':
    case 'what was the 2006-2007 competition name':
    case 'what was the 2006-2007 competition name?':
    case 'what was the 2006-2007 competition?':
    case 'competition name in 2006-2007?':
    case 'FRC competition for 2006-2007':
    case 'FRC competition for 2006-2007?':
    case 'FRC competition in 2006-2007':
    case 'FRC competition in 2006-2007?':
        message.channel.sendMessage('Rack n` Roll');
        message.channel.sendFile('./compPics/2007.png','2007.png','RECYCLE RUSH');
        break;
    case 'FIRST Aim High':
    case '2006 competition name':
    case 'what was the 2006 competition name':
    case 'what was the 2006 competition name?':
    case 'what was the 2006 competition?':
    case 'competition name in 2006?':
    case 'FRC competition for 2006':
    case 'FRC competition for 2006?':
    case 'FRC competition in 2006':
    case 'FRC competition in 2006?':
    case '2005-06 competition name':
    case 'what was the 2005-06 competition name':
    case 'what was the 2005-06 competition name?':
    case 'what was the 2005-06 competition?':
    case 'competition name in 2005-06?':
    case 'FRC competition for 2005-06':
    case 'FRC competition for 2005-06?':
    case 'FRC competition in 2005-06':
    case 'FRC competition in 2005-06?':
    case '2005-2006 competition name':
    case 'what was the 2005-2006 competition name':
    case 'what was the 2005-2006 competition name?':
    case 'what was the 2005-2006 competition?':
    case 'competition name in 2005-2006?':
    case 'FRC competition for 2005-2006':
    case 'FRC competition for 2005-2006?':
    case 'FRC competition in 2005-2006':
    case 'FRC competition in 2005-2006?':
        message.channel.sendMessage('Aim High');
        message.channel.sendFile('./compPics/2006.png','2006.png','AIM HIGH');
        break;
    case 'when is frc kickoff':
    case 'kickoff countdown':
    case 'when is frc kickoff?':
    case 'frc kickoff':
    case 'kickoff countdown':
    case 'when is the kickoff':
    case 'when is kickoff':
    case 'when is kickoff?':
    case 'when is the kickoff?':
      CountDownTimer('01/7/2017 10:30 AM', 'countdown');
          function CountDownTimer(dt, id)
          {
                var end = new Date(dt);
                  var _second = 1000;
                  var _minute = _second * 60;
                  var _hour = _minute * 60;
                  var _day = _hour * 24;
                  var timer;

                  var now = new Date();
                  var distance = end - now;

                  var days = Math.floor(distance / _day);
                  var hours = Math.floor((distance % _day) / _hour);
                  var minutes = Math.floor((distance % _hour) / _minute);
                  var seconds = Math.floor((distance % _minute) / _second);

                   message.channel.sendMessage('Countdown to FRC kickoff: ' + days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds. GET HYPED! :thisIsDope:');
                   message.channel.sendMessage( 'Extra kickoff information can be found here: http://www.firstinspires.org/robotics/frc/kickoff');

           }
      break;
    }
    //end of switch statement

    //beginning of TBA API integration

    if (message.content === 'TBA HELP') {
  		  message.channel.sendMessage( 'https://github.com/StoneMoney/FIRSTbot/wiki');
  	}
  	// Get team name
  	(message.content.match(/^TBA TEAM \d+/im) || []).forEach(function(match) {
  		tba.getTeamById(match.slice(9), function(err, team_info) {
  			if (!err)   message.channel.sendMessage( team_info.nickname || team_info.name || 'Team not found');
  			});
  	});
  	// Get team location
  	(message.content.match(/^TBA LOCATE ([0-9]+)/im) || []).forEach(function(match) {
  		tba.getTeamById(match.slice(0), function(err, team_info) {
  			if (!err)   message.channel.sendMessage( team_info.location || 'Location/Team not found');
  		});
  	});
  	// Get team rookie year
  	(message.content.match(/^TBA ROOKIE ([0-9]+)/im) || []).forEach(function(match) {
  		tba.getTeamById(match.slice(0), function(err, team_info) {
  			if (!err)   message.channel.sendMessage( team_info.rookie_year || 'Year/Team not found');
  		});
  	});
  	// Get team robot name
  	(message.content.match(/^TBA ROBOT ([0-9]+)/im) || []).forEach(function(match) {
  		tba.getTeamRobotHistory(match.slice(0), function(err, robot_history) {
  			if (!err)   message.channel.sendMessage( robot_history['2016'].name || 'Robot Name/Team not found');
  		});
  	});
  	// Get Team Profile
  	(message.content.match(/^TBA PROFILE ([0-9]+)/im) || []).forEach(function(match) {
  		tba.getTeamById(match.slice(0), function(err, team_info) {
  			if (!err)   message.channel.sendMessage( 'Team nickname: ' + team_info.nickname + '\n' + 'Location: ' + team_info.location + '\n' + 'Rookie Year: ' + team_info.rookie_year + '\n' + 'Website: ' + team_info.website || 'Missing Info');
  		});
  	});
  	// Get match data
  	(message.content.match(/^TBA MATCH ([0-9]+) ([A-Z]+) (QUALS|QUARTERS|SEMIS|FINALS) ([0-9]+ ([1-3])|[0-9]+)/gi) || []).forEach(function(match) {
  		var matches = message.content.split(/\s+/g);
  		var matchCode = makeTBAMatchCode(matches[2], matches[3], matches[4], matches[5], matches[6]);
  		// Convert match code to scores (ENGLISH)
  		tba.getSingleMatch(matchCode, function(err, match_data) {
  			if (!err) {
  				  message.channel.sendMessage( 'Scores: Red Alliance: ' + match_data.alliances.red.score + ' | Blue Alliance: ' + match_data.alliances.blue.score || 'Match Information Not found. The format to find a match is `TBA MATCH (YEAR) (EVENT ID) (QUALS|QUARTERS|SEMIS|FINALS) (MATCH NUMBER) (ROUND NUMBER [FOR ELIMINATION ROUNDS])`');
  				setTimeout(function() {
  					if (match_data.alliances.red.score > match_data.alliances.blue.score) {
  						  message.channel.sendMessage( 'The winner was the Red Alliance! :red_circle:');
  					}
  					if (match_data.alliances.blue.score > match_data.alliances.red.score) {
  						  message.channel.sendMessage( 'The winner was the Blue Alliance! :large_blue_circle:');
  					}
  					if (match_data.alliances.blue.score == match_data.alliances.red.score) {
  						if (match_data.comp_level == 'qm') {
  							  message.channel.sendMessage( 'Its a draw! :black_circle:');
  						} else if (match_data.score_breakdown.blue.foulCount > match_data.score_breakdown.red.foulCount) {
  							  message.channel.sendMessage( 'The winner was the Red Alliance! (Tiebreaker: Penalties) :red_circle:');
  						} else if (match_data.score_breakdown.red.foulCount > match_data.score_breakdown.blue.foulCount) {
  							  message.channel.sendMessage( 'The winner was the Blue Alliance! (Tiebreaker: Penalties) :large_blue_circle:');
  						} else if (match_data.score_breakdown.red.foulCount == match_data.score_breakdown.blue.foulCount) {
  							  message.channel.sendMessage( 'It\'s a draw! :black_circle:');
  						}
  					}
  				}, 100);
  			}
  		});
  	});
  	// Get match videos
  	(message.content.match(/^TBA VIDEO ([0-9]+) ([A-Z]+) (QUALS|QUARTERS|SEMIS|FINALS) ([0-9]+ ([1-3])|[0-9]+)/gi) || []).forEach(function(match) {
  		var failedVideoCheck = false;
  		var matches = message.content.split(/\s+/g);
  		var matchCode = makeTBAMatchCode(matches[2], matches[3], matches[4], matches[5], matches[6]);
  		// Convert match code to scores (ENGLISH)
  		tba.getSingleMatch(matchCode, function(err, match_data) {
  			if (!err) {
  				try {
  					match_data['videos'][0]['key'];
  				} catch (e) {
  					failedVideoCheck = true;
  				}
  				if (!failedVideoCheck) {
  					  message.channel.sendMessage( 'Video: http://youtu.be/' + match_data['videos'][0]['key']);
  				} else {
  					  message.channel.sendMessage( 'Error: No video found!');
  				}
  			}
  		});
   });
});

// log our bot in
bot.login(token);
