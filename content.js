const INSTA_PHOTO_LIKES = ".Igw0E.IwRSH.eGOV_.ybXk5.vwCYk";
const INSTA_VIDEO_VIEWS = ".EDfFK.ygqzn";

const YT_LIKE_AND_DISLIKE = ".style-scope.ytd-toggle-button-renderer.style-text";
const YT_LIKE_AND_DISLIKE_BAR = "sentiment";
const YT_RECOMMENDED_VIDEO_VIEWS = ".style-scope.ytd-video-meta-block";
const YT_RECOMMENDED_VIDEO_VIEWS_ID = "metadata-line";
const YT_NUMBER_OF_COMMENTS = ".count-text.style-scope.ytd-comments-header-renderer";
const YT_NUMBER_OF_COMMENT_LIKES = ".style-scope.ytd-comment-action-buttons-renderer";
const YT_NUMBER_OF_COMMENT_LIKES_ID = "vote-count-middle";
const YT_NUMBER_OF_COMMENT_REPLIES = ".style-scope.ytd-comment-replies-renderer";
const YT_NUMBER_OF_COMMENT_REPLIES_ID = "more-replies";


function instagram(){

	var photoLikes = document.querySelectorAll(INSTA_PHOTO_LIKES);
	for (var i = 0; i < photoLikes.length; i++){
		photoLikes[i].innerText = "";
	}
	var videoViews = document.querySelectorAll(INSTA_VIDEO_VIEWS);
	for (var i = 0; i < videoViews.length; i++){
		videoViews[i].innerText = "";
	}
	var commentLikes = document.querySelectorAll("._7UhW9.PIoXz.MMzan._0PwGv.uL8Hv");
	for (var i = 0; i < commentLikes.length; i++){
		commentLikes[i].querySelectorAll(".FH9sR")[1].innerHTML = "";
	}
}

function youtube(){
	var selector = location.href;

	//-----Home page-----

	var videoPreview = document.querySelectorAll("#metadata-line");
	for (var i = 0; i < videoPreview.length; i++){
		var viewsData = videoPreview[i].innerText.split("\n");
		if (viewsData[0].includes("views")){
			videoPreview[i].innerText = viewsData[1];
		}
	}
	
	//-----Video-----
	
	/*look into replacing message passing with location.href, maybe in background use setinterval to monitor for url change
	  between the same company like youtube.com/1234 to youtube.com/9876.*/

	if (selector.includes("/watch?v=")){ 
		console.log("Watching Video");
		//Removes number of views on current video
		var videoViews = document.querySelectorAll("#count"); //searching for an element with ID count
		videoViews[1].innerText = "";
		//Remove number of subscribers
		document.getElementById("owner-sub-count").innerHTML = "";
		//remove likes & dislikes
		document.querySelectorAll(YT_LIKE_AND_DISLIKE)[1].innerText = ""; //Likes
		document.querySelectorAll(YT_LIKE_AND_DISLIKE)[3].innerText = ""; //Dislikes
		document.getElementById(YT_LIKE_AND_DISLIKE_BAR).innerHTML = ""; //Like & dislike bar
		//remove views on recommended videos
		var recommendVideos = document.querySelectorAll(YT_RECOMMENDED_VIDEO_VIEWS);
		for (var i = 0; i < recommendVideos.length; i++){
			if (recommendVideos[i].id.localeCompare(YT_RECOMMENDED_VIDEO_VIEWS_ID) == 0){
				recommendVideos[i].innerText = "";
			}
		}
		//remove number of comments
		document.querySelectorAll(YT_NUMBER_OF_COMMENTS)[0].innerText = "Comments";
		//remove number of likes on comments
		var commentLikes = document.querySelectorAll(YT_NUMBER_OF_COMMENT_LIKES);
		for (var i = 0; i < commentLikes.length; i++){
			if (commentLikes[i].id.localeCompare(YT_NUMBER_OF_COMMENT_LIKES_ID) == 0){
				commentLikes[i].innerText = "";
			}
		}
		//remove number of replies to comments
		var commentReplies = document.querySelectorAll(YT_NUMBER_OF_COMMENT_REPLIES);
		for (var i = 0; i < commentReplies.length; i++){
			if (commentReplies[i].id.localeCompare(YT_NUMBER_OF_COMMENT_REPLIES_ID)){
				commentReplies[i].innerHTML = "View replies";
			}
		}
	} 
	//-----Channel-----

	if (selector.includes("/channel/") ||  selector.includes("/user/")){
		//remove number of subscribers on channel header
		var channelSubscribers = document.getElementById("subscriber-count");
		if (channelSubscribers != null){
			channelSubscribers.innerText = null;
		}

		//remove views on channel trailer and other videos
		var videoViews = document.querySelectorAll("#metadata-line");
		for (var i = 0; i < videoViews.length; i++){
			var viewsData = videoViews[i].innerText.split("\n");
			if (viewsData[0].includes("views")){
				videoViews[i].innerText = viewsData[1];
			}
		}

		if (selector.includes("/community")){
			var communityLikes = document.querySelectorAll("#vote-count-middle");
			for (var i = 0; i < communityLikes.length; i++){
				if (communityLikes[i].innerText != null){
					communityLikes[i].innerText = null;
				}
			}
			var communityComments = document.querySelectorAll(".align-by-text.style-scope.ytd-backstage-comments-renderer");
			for (var i = 0; i < communityComments.length; i++){
				communityComments[i].innerText = "View all comments";
			}
		}

		if (selector.includes("/channels")){
			var featuredChannels = document.querySelectorAll("#thumbnail-attribution");
			for (var i = 0; i < featuredChannels.length; i++){
				featuredChannels[i].innerText = null;
			}
		}
		if (selector.includes("/about")){
			var channelStats = document.querySelector("#right-column");
			if (channelStats.children[2] != null && channelStats.children[2].innerText.includes("views")){
				channelStats.children[2].remove();
			}
		}
	}
}

var port = chrome.runtime.connect({name: "shareTabInfo"}); //Create groupchat with secret password

port.postMessage({question: "Tell me the url"}); // ask group for the url
console.log("asked for URL");

port.onMessage.addListener(function(msg) { //when message is recieved
	console.log("did I get a response?");
	console.log(msg.answer);
  
	if (msg.answer.includes("instagram")){
		console.log(msg.answer);
		setInterval(instagram, 1000);
	}else if(msg.answer.includes("youtube")){
		setInterval(youtube, 500);
	}
});