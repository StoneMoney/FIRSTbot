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
var Discord = require("discord.js");
var initTBA = require("thebluealliance");

var bot = new Discord.Client();
var tba = initTBA('node-thebluealliance','Node.js wrapper library for the TBA v2 API','1.1.1');



bot.on("message", function(message)
{
	//team name//
	function tbaTeamLookup(a) 
	{
	tba.getTeamById(a, function(err, team_info) {
			if (!err) {
				
				bot.sendMessage(message, team_info.nickname || team_info.name || "Team not found");
				}
		})
	}
	
	//locate//
	function tbaTeamLocation(a) 
	{
	tba.getTeamById(a, function(err, team_info) {
			if (!err) {
				
				bot.sendMessage(message, team_info.location || "Location/Team not found");
				}
		})
	}
	
	//rookie//
	function tbaTeamRookieYear(a) 
	{
	tba.getTeamById(a, function(err, team_info) {
			if (!err) {
				
				bot.sendMessage(message, team_info.rookie_year || "Year/Team not found");
				}
		})
	}
	
	//robot name//
	/*function tbaTeamRobotName(a) 
	{
	tba.getTeamRobotHistory(a, function(err, robot_history) {
			if (!err) {
				bot.sendMessage(message, robot_history.2016.name || "Robot Name/Team not found")
				}
		})
	}*/
	
	function makeTBAMatchCode(year, event, matchType, matchSeries, matchNum) {
	var matchCode = year + event.toLowerCase() + "_";

	switch (matchType) {
    case "QUALS":
      matchCode += "qm" + matchSeries;
      break;
    case "QUARTERS":
      matchCode += "qf" + matchSeries + "m" + matchNum;
      break;
    case "SEMIS":
      matchCode += "sf" + matchSeries + "m" + matchNum;
      break;
    case "FINALS":
      matchCode += "f1m" + matchSeries;
      break;
    default:
	}
	return matchCode;
	}
	
	//emotes & fun//
	if(message.content === "mangoLover")
	{
		bot.sendMessage(message, "http://stonemoney.xyz/mangoLover128.png");
	}
	if(message.content === "thisIsDope")
	{
		bot.sendMessage(message, "http://stonemoney.xyz/thisIsDope128.png");
	}
	if(message.content === "toteALLY")
	{
		bot.sendMessage(message, "http://stonemoney.xyz/toteALLY128.png");
	}
	if(message.content === "redAlliance")
	{
		bot.sendMessage(message, "http://stonemoney.xyz/redAlliance128.png");
	}
	if(message.content === "blueAlliance")
	{
		bot.sendMessage(message, "http://stonemoney.xyz/blueAlliance128.png");
	}
	if(message.content === "The Cheesy Poofs")
	{
		bot.sendMessage(message, "http://stonemoney.xyz/chezyPoofs128.png");
	}
	if(message.content === "tBA")
	{
		bot.sendMessage(message, "http://stonemoney.xyz/tba128.png");
	}
	if(message.content === "water game")
	{
		bot.sendMessage(message, "confirmed");
	}
	if(message.content === "Water game")
	{
		bot.sendMessage(message, "confirmed");
	}
		if(message.content === "Watergame")
	{
		bot.sendMessage(message, "confirmed");
	}
		if(message.content === "watergame")
	{
		bot.sendMessage(message, "confirmed");
	}
		if(message.content === "water game 2017")
	{
		bot.sendMessage(message, "confirmed");
	}
		if(message.content === "What is next years game?")
	{
		bot.sendMessage(message, "water game");
	}
		if(message.content === "what is next years game?")
	{
		bot.sendMessage(message, "water game");
	}
	if(message.content === "Beach Bots Clutch")
	{
		bot.sendMessage(message, "https://gfycat.com/AstonishingSilentAmericankestrel");
	}
	if(message.content === "robot roulette")
	{
		bot.sendMessage(message, "https://gifsound.com/?gfycat=ThirstyThirdAfricanparadiseflycatcher&v=PGNiXGX2nLU&s=61");
	}
	if(message.content === "begin quest")
	{
		bot.reply(message, "Ive just received word that theres a settlement that needs our help. Ill mark it on your map" );
	}
	
	
	
	//TBA commands - Running with a custom fork of node-thebluealliance//
	if(message.content === "TBA HELP")
	{
		bot.sendMessage(message, "http://www.stonemoney.xyz/FIRSTbot.html" );
	}
	//team name detect//
	(message.content.match(/^TBA TEAM \d+/im) || []).forEach(function(match) {
		tbaTeamLookup(match.slice(9))
	});
	//team locate detect//
	(message.content.match(/^TBA LOCATE ([0-9]+)/im) || []).forEach(function(match) {
		tbaTeamLocation(match.slice(0))
	});
	//team rookie year//
	(message.content.match(/^TBA ROOKIE ([0-9]+)/im) || []).forEach(function(match) {
		tbaTeamRookieYear(match.slice(0))
	});
	//team robot name detect TODO//
	/*(message.content.match(/^TBA ROBOT ([0-9]+)/im) || []).forEach(function(match) {
		tbaTeamRobotName(match.slice(0))
	});*/
	
	//matches//
	(message.content.match(/^TBA MATCH ([0-9]+) ([A-Z]+) (QUALS|QUARTERS|SEMIS|FINALS) ([0-9]+ ([1-3])|[0-9]+)/gi) || []).forEach(function(match) {	
		var matches = message.content.split(/\s+/g);
		var matchCode = makeTBAMatchCode(matches[2], matches[3], matches[4], matches [5], matches[6]);
			matchInfo(matchCode);
			//Convert match code to scores (ENGLISH)//
			function matchInfo(a) {
				tba.getSingleMatch(matchCode, function(err, match_data) {
					if (!err) {
				
						bot.sendMessage(message, "Scores: Red Alliance: " + match_data.alliances.red.score + " | Blue Alliance: " + match_data.alliances.blue.score || "Match Information Not found. The format to find a match is `TBA MATCH (YEAR) (EVENT ID) (QUALS|QUARTERS|SEMIS|FINALS) (MATCH NUMBER) (ROUND NUMBER [FOR ELIMINATION ROUNDS])`");
						setTimeout(matchResult, 100)
						function matchResult() {
							if(match_data.alliances.red.score > match_data.alliances.blue.score) {
								bot.sendMessage(message, "The winner was the Red Alliance! :red_circle:");
								}
							if(match_data.alliances.blue.score > match_data.alliances.red.score) {
								bot.sendMessage(message, "The winner was the Blue Alliance! :large_blue_circle:");
								}
							if(match_data.alliances.blue.score == match_data.alliances.red.score) {
									if(match_data.comp_level == "qm") {
										bot.sendMessage(message, "Its a draw! :black_circle:");
										}
								
									else if(match_data.score_breakdown.blue.foulCount > match_data.score_breakdown.red.foulCount) {
									bot.sendMessage(message, "The winner was the Red Alliance! (Tiebreaker: Penalties) :red_circle:");
									}
									else if(match_data.score_breakdown.red.foulCount > match_data.score_breakdown.blue.foulCount) {
										bot.sendMessage(message, "The winner was the Blue Alliance! (Tiebreaker: Penalties) :large_blue_circle:");
									}
									else if(match_data.score_breakdown.red.foulCount == match_data.score_breakdown.blue.foulCount) {
										bot.sendMessage(message, "Its a draw! :black_circle:");
									}
							}
						}
					}
				})
			}
	});
	//video matches//
		(message.content.match(/^TBA VIDEO ([0-9]+) ([A-Z]+) (QUALS|QUARTERS|SEMIS|FINALS) ([0-9]+ ([1-3])|[0-9]+)/gi) || []).forEach(function(match) {	
		var failedVideoCheck = 0
		var matches = message.content.split(/\s+/g);
		var matchCode = makeTBAMatchCode(matches[2], matches[3], matches[4], matches [5], matches[6]);
			matchVideo(matchCode);
			//Convert match code to scores (ENGLISH)//
			function matchVideo(a) {
				tba.getSingleMatch(matchCode, function(err, match_data) {
					if (!err) {
						try {
							match_data['videos'][0]['key'] 
						}
						catch (e) {
							failedVideoCheck=1
						}
						if(failedVideoCheck==0){
						bot.sendMessage(message, "video: http://youtu.be/" + match_data['videos'][0]['key']);
						}
						else{
						bot.sendMessage(message, "Error: No video found");	
						}
					}
				})
			}
	});
		
});



bot.loginWithToken("MTc2ODY1NjQxOTU1OTgzMzYw.CgmOdw.qvO_5R8O7a756IR0eQqYVNg8xSI");