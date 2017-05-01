var twitterEndpoint = "https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api";

var list = "all";
var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404", "clickerheroesbot"];

function createWarning(msg) {
  return $('<div class="notification is-warning">' + msg + '</div>');
}

function createCard(isOnline, data) {
  var card = '';
  if (isOnline) {
    card += '<div class="card is-fullwidth online">';
  } else {
    card += '<div class="card is-fullwidth offline">';
  }
  card += '<div class="card-content">';
  card += '<div class="media">';
  card += '<div class="media-left">';
  card += '<figure class="image is-32x32"><img src="' + data.logo + '" alt="Image"></figure>';
  card += '</div>';
  card += '<div class="media-content">';
  card += '<p class="title is-5">' + data.display_name + '</p>';
  card += '<p class="subtitle is-6">';
  card += '<a href=' + data.url + '>@' + data.name + '</a>';
  card += '</p>';
  card += '</div>';
  card += '</div>';
  card += '<div class="content"></div>';
  if (data.status) {
    card += data.status;
  } else {
    card += '<em>No status.</em>';
  }
  card += '</div>';
  card += '</div>';
  return $(card);
}

function setActive(id) {
  $("#notifications").empty();
  $("#channel-list").empty();

  $("#all").removeClass("is-active");
  $("#online").removeClass("is-active");
  $("#offline").removeClass("is-active");

  $("#" + id).addClass("is-active");
}

function listChannel(isOnline, name) {
  $.getJSON(twitterEndpoint + "/channels/" + name + "/", function(data) {
    if (data.status === 404) {
      var warning = createWarning(data.message);
      $("#notifications").append(warning);
      return;
    }
    var card = createCard(isOnline, data);
    $("#channel-list").append(card);
  });
}

function updateList() {
  channels.forEach(function(channel) {
    $.getJSON(twitterEndpoint + "/streams/" + channel + "/", function(data) {
      if (data.stream) {
        // channel is online
        if (list === "online" || list === "all") {
          listChannel(true, channel);
        }
      } else {
        // channel is offline
        if (list === "offline" || list === "all") {
          listChannel(false, channel);
        }
      }
    });
  });
}

function allClicked() {
  list = "all";
  setActive("all");
  updateList();
}

function onlineClicked() {
  list = "online";
  setActive("online");
  updateList();
}

function offlineClicked() {
  list = "offline";
  setActive("offline");
  updateList();
}

$(document).ready(function() {
  updateList();
});