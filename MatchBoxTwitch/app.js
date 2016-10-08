/*
 _____ ___ ____  ____ _____ _           _      _
|  ___|_ _|  _ \/ ___|_   _| |__   ___ | |_   (_)___
| |_   | || |_) \___ \ | | | '_ \ / _ \| __|  | / __|
|  _|  | ||  _ < ___) || | | |_) | (_) | |_ _ | \__ \
|_|   |___|_| \_\____/ |_| |_.__/ \___/ \__(_)/ |___/
                                            |__/
				Public Build 1
	   A twitch bot for FIRST Robotics
  Powered by tmi.js and node-thebluealliance
	 http://stonemoney.xyz/FIRSTbot.html
*/
var tmi = require('tmi.js');
var initTBA = require('thebluealliance');
var tba = initTBA('node-thebluealliance', 'Node.js wrapper library for the TBA v2 API', '1.1.1');

var options = {
	options: {
		debug: true
	},
	connection: {
		cluster: "aws",
		reconnect: true
	},
	identity: {
		username: "",
		password: ""
	},
	channels: ['']
};

var client = new tmi.client(options);
var messagedId = ''

var resetcount = 0;
client.connect();
client.on('chat', function (channel, userstate, message, self) {
	if (self) return
	switch (message.toLowerCase()) {
	case 'water game':
	case 'watergame':
	case 'water game 2017':
	case 'pizzagame':
	case 'pizza game':
	case 'pizza game 2017':
			 client.say(channel, 'confirmed');
		break;
	case '+1 field reset':
			 resetcount += 1;
			 client.say(channel,'Added! Reset Count = ' + resetcount);
			 console.log('+1 reset counter')
			 break;
	case 'field reset count':
		   client.say(channel,'Reset Count = ' + resetcount);
			 break;
	case 'what is next year\'s game?':
	case 'what will next year\'s game be?':
			 client.say(channel, 'pizza game');
		break;
	case 'beach bots clutch':
				if(channel="FRCGameSense"){

				} else {
			 			client.say(channel, 'https://gfycat.com/AstonishingSilentAmericankestrel');
		 		}
		break;
	case 'robot roulette':
			 if(channel="FRCGameSense"){

			 } else {
				 		client.say(channel, 'https://gifsound.com/?gfycat=ThirstyThirdAfricanparadiseflycatcher&v=PGNiXGX2nLU&s=61');
		 	 }
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
		CountDownTimer('01/7/2017 12:00 PM', 'countdown');
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

					 client.say(channel, 'Countdown to FRC kickoff:' + days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds. GET HYPED!');
					//  client.say(channel, 'Link to stream is not currently avaliable. Check back later using this command.');

			}
		break;
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

client.on('chat', function(channel, user, message, self) {

	// Get help
	if (message === 'TBA HELP') {
		if(channel="FRCGameSense"){
				client.say(channel, 'See FIRSTbot wiki on github')
		} else {
		client.say(channel, 'https://github.com/StoneMoney/FIRSTbot/wiki');
	  }
	}
	// Get team name
	(message.match(/^TBA TEAM \d+/im) || []).forEach(function(match) {
		tba.getTeamById(match.slice(9), function(err, team_info) {
			if (!err) client.say(channel, team_info.nickname || team_info.name || 'Team not found');
		});
	});
	// Get team location
	(message.match(/^TBA LOCATE ([0-9]+)/im) || []).forEach(function(match) {
		tba.getTeamById(match.slice(0), function(err, team_info) {
			if (!err) client.say(channel, team_info.location || 'Location/Team not found');
		});
	});
	// Get team rookie year
	(message.match(/^TBA ROOKIE ([0-9]+)/im) || []).forEach(function(match) {
		/*tba.getTeamById(match.slice(0), function(err, team_info) {
			if (!err) client.say(channel, team_info.rookie_year || 'Year/Team not found');
		});*/
		client.say(channel, 'This command has been disabled');
	});
	// Get team robot name
	(message.match(/^TBA ROBOT ([0-9]+)/im) || []).forEach(function(match) {
		tba.getTeamRobotHistory(match.slice(0), function(err, robot_history) {
			if (!err) client.say(channel, robot_history['2016'].name || 'Robot Name/Team not found');
		});
	});
	// Get match data
	(message.match(/^TBA MATCH ([0-9]+) ([A-Z]+) (QUALS|QUARTERS|SEMIS|FINALS) ([0-9]+ ([1-3])|[0-9]+)/gi) || []).forEach(function(match) {
		var matches = message.split(/\s+/g);
		var matchCode = makeTBAMatchCode(matches[2], matches[3], matches[4], matches[5], matches[6]);
		// Convert match code to scores (ENGLISH)
		tba.getSingleMatch(matchCode, function(err, match_data) {
			if (!err) {
				client.say(channel, 'Scores: Red Alliance: ' + match_data.alliances.red.score + ' | Blue Alliance: ' + match_data.alliances.blue.score || 'Match Information Not found. The format to find a match is `TBA MATCH (YEAR) (EVENT ID) (QUALS|QUARTERS|SEMIS|FINALS) (MATCH NUMBER) (ROUND NUMBER [FOR ELIMINATION ROUNDS])`');
				setTimeout(matchResult, 2000)
				function matchResult() {
					if (match_data.alliances.red.score > match_data.alliances.blue.score) {
						client.say(channel, 'The winner was the Red Alliance!');
					}
					if (match_data.alliances.blue.score > match_data.alliances.red.score) {
						client.say(channel, 'The winner was the Blue Alliance!');
					}
					if (match_data.alliances.blue.score == match_data.alliances.red.score) {
						if (match_data.comp_level == 'qm') {
							client.say(channel, 'Its a draw!');
						} else if (match_data.score_breakdown.blue.foulCount > match_data.score_breakdown.red.foulCount) {
							client.say(channel, 'The winner was the Red Alliance! (Tiebreaker: Penalties)');
						} else if (match_data.score_breakdown.red.foulCount > match_data.score_breakdown.blue.foulCount) {
							client.say(channel, 'The winner was the Blue Alliance! (Tiebreaker: Penalties)');
						} else if (match_data.score_breakdown.red.foulCount == match_data.score_breakdown.blue.foulCount) {
							client.say(channel, 'It\'s a draw!');
						}
					}
				}
			}
		});
	});
	// get match video
	(message.match(/^TBA VIDEO ([0-9]+) ([A-Z]+) (QUALS|QUARTERS|SEMIS|FINALS) ([0-9]+ ([1-3])|[0-9]+)/gi) || []).forEach(function(match) {
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
					client.say(channel, 'Video: http://youtu.be/' + match_data['videos'][0]['key']);
				} else {
					client.say(channel, 'Error: No video found!');
				}
			}
		});


	});

});



client.on('connected', function(address, port) {
	console.log("Address: " + address + " Port: " + port);
	client.action("StoneMoney533","Bot Connected");
});
