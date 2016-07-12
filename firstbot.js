/*
 _____ ___ ____  ____ _____ _           _      _
|  ___|_ _|  _ \/ ___|_   _| |__   ___ | |_   (_)___
| |_   | || |_) \___ \ | | | '_ \ / _ \| __|  | / __|
|  _|  | ||  _ < ___) || | | |_) | (_) | |_ _ | \__ \
|_|   |___|_| \_\____/ |_| |_.__/ \___/ \__(_)/ |___/
                                            |__/
				Public Build v1
	   A discord bot for FIRST Robotics
	 http://stonemoney.xyz/FIRSTbot.html
*/
var Discord = require('discord.js');
var initTBA = require('thebluealliance');

var bot = new Discord.Client();
var tba = initTBA('node-thebluealliance', 'Node.js wrapper library for the TBA v2 API', '1.1.1');

bot.on('message', function(message) {
	// Misc. commands
	switch (message.content.toLowerCase()) {
		case 'mangolover':
			bot.sendMessage(message, 'http://stonemoney.xyz/mangoLover128.png');
			break;
		case 'thisisdope':
			bot.sendMessage(message, 'http://stonemoney.xyz/thisIsDope128.png');
			break;
		case 'toteally':
			bot.sendMessage(message, 'http://stonemoney.xyz/toteALLY128.png');
			break;
		case 'redalliance':
			bot.sendMessage(message, 'http://stonemoney.xyz/redAlliance128.png');
			break;
		case 'bluealliance':
			bot.sendMessage(message, 'http://stonemoney.xyz/blueAlliance128.png');
			break;
		case 'the cheesy poofs':
			bot.sendMessage(message, 'http://stonemoney.xyz/chezyPoofs128.png');
			break;
		case 'tba':
			bot.sendMessage(message, 'http://stonemoney.xyz/tba128.png');
			break;
		case 'water game':
		case 'watergame':
		case 'water game 2017':
			bot.sendMessage(message, 'confirmed');
			break;
		case 'what is next year\'s game?':
		case 'what will next year\'s game be?':
			bot.sendMessage(message, 'water game');
			break;
		case 'beach bots clutch':
			bot.sendMessage(message, 'https://gfycat.com/AstonishingSilentAmericankestrel');
			break;
		case 'robot roulette':
			bot.sendMessage(message, 'https://gifsound.com/?gfycat=ThirstyThirdAfricanparadiseflycatcher&v=PGNiXGX2nLU&s=61');
			break;
	}

	// TBA commands - Running with a custom fork of node-thebluealliance.

	// Get help
	if (message.content === 'TBA HELP') {
		bot.sendMessage(message, 'http://www.stonemoney.xyz/FIRSTbot.html');
	}
	// Get team name
	(message.content.match(/^TBA TEAM \d+/im) || []).forEach(function(match) {
		tba.getTeamById(match.slice(9), function(err, team_info) {
			if (!err) bot.sendMessage(message, team_info.nickname || team_info.name || 'Team not found');
		});
	});
	// Get team location
	(message.content.match(/^TBA LOCATE ([0-9]+)/im) || []).forEach(function(match) {
		tba.getTeamById(match.slice(0), function(err, team_info) {
			if (!err) bot.sendMessage(message, team_info.location || 'Location/Team not found');
		});
	});
	// Get team rookie year
	(message.content.match(/^TBA ROOKIE ([0-9]+)/im) || []).forEach(function(match) {
		tba.getTeamById(match.slice(0), function(err, team_info) {
			if (!err) bot.sendMessage(message, team_info.rookie_year || 'Year/Team not found');
		});
	});
	// Get team robot name
	(message.content.match(/^TBA ROBOT ([0-9]+)/im) || []).forEach(function(match) {
		tba.getTeamRobotHistory(match.slice(0), function(err, robot_history) {
			if (!err) bot.sendMessage(message, robot_history['2016'].name || 'Robot Name/Team not found');
		});
	});

	// Get match data
	(message.content.match(/^TBA MATCH ([0-9]+) ([A-Z]+) (QUALS|QUARTERS|SEMIS|FINALS) ([0-9]+ ([1-3])|[0-9]+)/gi) || []).forEach(function(match) {
		var matches = message.content.split(/\s+/g);
		var matchCode = makeTBAMatchCode(matches[2], matches[3], matches[4], matches[5], matches[6]);
		// Convert match code to scores (ENGLISH)
		tba.getSingleMatch(matchCode, function(err, match_data) {
			if (!err) {
				bot.sendMessage(message, 'Scores: Red Alliance: ' + match_data.alliances.red.score + ' | Blue Alliance: ' + match_data.alliances.blue.score || 'Match Information Not found. The format to find a match is `TBA MATCH (YEAR) (EVENT ID) (QUALS|QUARTERS|SEMIS|FINALS) (MATCH NUMBER) (ROUND NUMBER [FOR ELIMINATION ROUNDS])`');
				setTimeout(function() {
					if (match_data.alliances.red.score > match_data.alliances.blue.score) {
						bot.sendMessage(message, 'The winner was the Red Alliance! :red_circle:');
					}
					if (match_data.alliances.blue.score > match_data.alliances.red.score) {
						bot.sendMessage(message, 'The winner was the Blue Alliance! :large_blue_circle:');
					}
					if (match_data.alliances.blue.score == match_data.alliances.red.score) {
						if (match_data.comp_level == 'qm') {
							bot.sendMessage(message, 'Its a draw! :black_circle:');
						} else if (match_data.score_breakdown.blue.foulCount > match_data.score_breakdown.red.foulCount) {
							bot.sendMessage(message, 'The winner was the Red Alliance! (Tiebreaker: Penalties) :red_circle:');
						} else if (match_data.score_breakdown.red.foulCount > match_data.score_breakdown.blue.foulCount) {
							bot.sendMessage(message, 'The winner was the Blue Alliance! (Tiebreaker: Penalties) :large_blue_circle:');
						} else if (match_data.score_breakdown.red.foulCount == match_data.score_breakdown.blue.foulCount) {
							bot.sendMessage(message, 'It\'s a draw! :black_circle:');
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
					bot.sendMessage(message, 'Video: http://youtu.be/' + match_data['videos'][0]['key']);
				} else {
					bot.sendMessage(message, 'Error: No video found!');
				}
			}
		});

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
	});
});


bot.loginWithToken('');