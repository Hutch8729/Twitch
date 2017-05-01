var apiBaseURL = "https://wind-bow.gomix.me/twitch-api/"
var channelsArr = ["NALCS1", "NALCS2", "riotgames", "freecodecamp", "summit1g", "imaqtpie", "ESL_CSGO", "noobs2ninjas", "comster404", "c9sneaky", "brunofin"]

function checkTwitchChannelExists(){

	channelsArr.foreach(function(channel){
		$.getJSON(apiBaseURL + 'channels/' + channel '?callback=?', function(data) {
			if(data.status == 404){
				//make a function to make the display. maybe need to make an array of arrays with the status to then sort the list.
			}
		});
	})
  		console.log(data); 
}