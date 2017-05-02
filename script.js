var apiBaseURL = "https://wind-bow.gomix.me/twitch-api/";
var channelsArr = ["NALCS1", "NALCS2", "riotgames", "freecodecamp", "summit1g", "imaqtpie", "ESL_CSGO", "noobs2ninjas", "comster404", "c9sneaky", "brunofin"];
var doesNotExistArr = [];
var existsArr = [];
var onlineArr = [];
var offlineArr = [];
//var testerArr = ["comster404"];
var testerArr = ["c9sneaky"];

function breakUpArray(){
	//there has to be a better way to do this.
	testerArr.forEach(function(channel){
		checkTwitchChannelExists(channel);
	});
}

function checkTwitchChannelExists(user){
	$.getJSON(apiBaseURL + 'channels/' + user + '?callback=?', function(data) {
		console.log(data); 
		if(data.status === 404){
			//make a function to make the display. maybe need to make an array of arrays with the status to then sort the list.
			doesNotExistArr.push(user);
		}
		else{
			checkTwitchChannelStreaming(user);
		}
	})
}

function checkTwitchChannelStreaming(user){
	console.log(user);
	$.getJSON(apiBaseURL + 'streams/' + user + '?callback=?', function(data){
		console.log(data);
		if(data.stream == null){
			offlineArr.push(user);
		}
		else{
			onlineArr.push(user);
		}
	})
}

function make404Div(user, userData){
	var searchResults = "<div class='channel no-channel' id='" + user + "'><i class='fa fa-ban float-left fa-5x' aria-hidden='true'></i><h2>" + user + "</h2><p>" + userData.message + "</p></div>";
	$('#doesNotExistHolder').append(searchResults);
}

function makeOnlineDiv(user, userdata){
	var searchResults = "<div class='channel online' id='" + user + "'><img src =" userdata.class='fa fa-ban float-left fa-5x' aria-hidden='true'></i><h2>" + user + "</h2><p>" + userData.message + "</p></div>";
	$('#onlineHolder').append(searchResults);
}