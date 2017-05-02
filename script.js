var apiBaseURL = "https://wind-bow.gomix.me/twitch-api/";
var channelsArr = ["NALCS1", "NALCS2", "riotgames", "freecodecamp", "summit1g", "imaqtpie", "ESL_CSGO", "noobs2ninjas", "comster404", "c9sneaky", "brunofin"];
//var testerArr = ["comster404"];
var testerArr = ["NALCS1"];

function checkTwitchChannelExists(){

	channelsArr.forEach(function(channel){
		$.getJSON(apiBaseURL + 'channels/' + channel + '?callback=?', function(data) {
			console.log(data); 
			if(data.status === 404){
				//make a function to make the display. maybe need to make an array of arrays with the status to then sort the list.
				make404Div(channel, data);
			}
			else{
				checkTwitchChannelStreaming(channel, data);
			}
		})
	});
}

function checkTwitchChannelStreaming(user, channelData){
	console.log(user);
	$.getJSON(apiBaseURL + 'streams/' + user + '?callback=?', function(data){
		console.log(data);
		if(data.stream == null){
			makeOfflineDiv(user, data, channelData);
		}
		else{
			makeOnlineDiv(user, data);
		}
	})
}

function make404Div(user, userData){
	var searchResults = "<div class='channel no-channel shown' id='" + user + "'><i class='fa fa-ban float-left fa-5x' aria-hidden='true'></i><h2>" + user + "</h2><p>" + userData.message + "</p></div>";
	$('#doesNotExistHolder').append(searchResults);
}

function makeOnlineDiv(user, userData){
	var searchResults = "<div class='channel online shown' id='" + user + "'><img src=" + userData.stream.channel.logo + " class='float-left channelLogo'><h2>" + user + "</h2><p><strong>" + userData.stream.game + "</strong> - " + userData.stream.channel.status + "</p></div>";
	$('#onlineHolder').append(searchResults);
}

function makeOfflineDiv(user, userData, channelData){
	var searchResults = "<div class='channel offline shown' id='" + user + "'><img src=" + channelData.logo + " class='float-left channelLogo'><h2>" + user + "</h2><p><strong>OFFLINE</strong></p></div>";
	$('#offlineHolder').append(searchResults);
}

function displayAll(){
	$('.no-channel').addClass("shown").removeClass("hidden");
	$('.online').addClass("shown").removeClass("hidden");
	$('.offline').addClass("shown").removeClass("hidden");
}

function displayOnline(){
	$('.no-channel').addClass("hidden").removeClass("shown");
	$('.online').addClass("shown").removeClass("hidden");
	$('.offline').addClass("hidden").removeClass("shown");
}

function displayOffline(){
	$('.no-channel').addClass("hidden").removeClass("shown");
	$('.online').addClass("hidden").removeClass("shown");
	$('.offline').addClass("shown").removeClass("hidden");
}

$('#channelsHolder').on('click', '.channel', this.id, function(){
	if($("#" + this.id).hasClass("online") || $("#" + this.id).hasClass("offline")){
		window.location.href = "https://twitch.tv/" + this.id;
	}
});

$(document).ready(function(){
	checkTwitchChannelExists();
});