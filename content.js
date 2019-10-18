const INSTA_PHOTO_LIKES = ".Igw0E.IwRSH.eGOV_.ybXk5.vwCYk";
const INSTA_VIDEO_VIEWS = ".EDfFK.ygqzn";

const YT_LIKE_AND_DISLIKE = ".style-scope.ytd-toggle-button-renderer.style-text";
const YT_LIKE_AND_DISLIKE_BAR = "sentiment";
const YT_RECOMMENDED_VIDEO_VIEWS = ".style-scope.ytd-video-meta-block";
const YT_RECOMMENDED_VIDEO_VIEWS_ID = "metadata-line";
const YT_NUMBER_OF_COMMENTS = ".count-text.style-scope.ytd-comments-header-renderer";
const YT_NUMBER_OF_COMMENT_LIKES = ".style-scope.ytd-comment-action-buttons-renderer";
const YT_NUMBER_OF_COMMENT_LIKES_ID = "vote-count-middle";


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
	var followersAndFollowing = document.querySelector(".k9GMp");
	if(followersAndFollowing.children[2] != null && followersAndFollowing.children[1] != null){
		followersAndFollowing.children[2].remove();
		followersAndFollowing.children[1].remove();
	}

	var hoverLikes = document.querySelectorAll(".-V_eO");
	for(var i = 0; i < hoverLikes.length; i++){
		if (hoverLikes[i].innerText != null){
			hoverLikes[i].innerText = null;
		}
	}
}

function youtube(){
	var selector = location.href;

	//-----Video-----

	if (selector.includes("/watch?v=")){ 
		//Removes number of views on current video
		var videoViews = document.querySelectorAll("#count"); //searching for an element with ID count
		videoViews[1].innerText = "";
		//Remove number of subscribers
		document.getElementById("owner-sub-count").innerHTML = "";
		//remove likes & dislikes
		if (document.querySelectorAll(YT_LIKE_AND_DISLIKE) != null && document.querySelectorAll(YT_LIKE_AND_DISLIKE)[1].innerText != null){
			document.querySelectorAll(YT_LIKE_AND_DISLIKE)[1].innerText = null; //Likes
			document.querySelectorAll(YT_LIKE_AND_DISLIKE)[3].innerText = null; //Dislikes
			document.getElementById(YT_LIKE_AND_DISLIKE_BAR).innerText = null; //Like & dislike bar
		}
		//remove views on recommended videos
		var recommendVideos = document.querySelectorAll(YT_RECOMMENDED_VIDEO_VIEWS);
		for (var i = 0; i < recommendVideos.length; i++){
			if (recommendVideos[i].id.localeCompare(YT_RECOMMENDED_VIDEO_VIEWS_ID) == 0){
				recommendVideos[i].innerText = "";
			}
		}
		//remove number of comments
		var youtubeCommentHeader = document.querySelector(YT_NUMBER_OF_COMMENTS);
		if (youtubeCommentHeader != null && youtubeCommentHeader.innerText.localeCompare("Comments") != 0){
			youtubeCommentHeader.innerText = "Comments";
		}
		//remove number of likes on comments
		var commentLikes = document.querySelectorAll(YT_NUMBER_OF_COMMENT_LIKES);
		for (var i = 0; i < commentLikes.length; i++){
			if (commentLikes[i].id.localeCompare(YT_NUMBER_OF_COMMENT_LIKES_ID) == 0){
				commentLikes[i].innerText = "";
			}
		}
		//remove number of replies to comments
		var commentReplies = document.querySelectorAll(".style-scope.ytd-button-renderer");
		for (var i = 0; i < commentReplies.length; i++){
			if (commentReplies[i].id.localeCompare("text") == 0 && commentReplies[i].className.localeCompare("style-scope ytd-button-renderer") == 0){
				commentReplies[i].innerHTML = "View replies";
				commentReplies[i].innerText = "View replies";
			}
		}
	} else if (selector.includes("/channel/") ||  selector.includes("/user/")){ //-----Channel-----
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
		} else if (selector.includes("/channels")){
			var subscriptions = document.querySelectorAll("#thumbnail-attribution");
			var featuredChannels = document.querySelectorAll("#subscribers");
			var featuredChannelsDot = document.querySelectorAll("#dot");
			for (var i = 0; i < featuredChannels.length; i++){
				featuredChannels[i].innerText = null;
				featuredChannelsDot[i].innerText = null;
			}
			for (var i = 0; i < subscriptions.length; i++){
				subscriptions[i].innerText = null;
			}
		} else if (selector.includes("/about")){
			var channelStats = document.querySelector("#right-column");
			if (channelStats != null && channelStats.children[2].innerText.includes("views")){
				channelStats.children[2].remove();
			}
		}
	} else { //-----Home Page------
		//Removes views from all videos on Home page
		var videoPreview = document.querySelectorAll("#metadata-line");
		for (var i = 0; i < videoPreview.length; i++){
			var viewsData = videoPreview[i].innerText.split("\n");
			if (viewsData[0].includes("views")){
				videoPreview[i].innerText = viewsData[1]; //Keeps date in metadata line but hides views
			}else if (viewsData[0].includes("watching")){
				videoPreview[i].innerText = null; //hides live viewers on livestreams
			}
		}
		var latestPost = document.querySelectorAll(".style-scope.ytd-comment-action-buttons-renderer");
		for(var i = 0; i < latestPost.length; i++){
			latestPost[i].innerText = null;
		}
	}
}

function twitter(){
	var selector = location.href;
	
	var replies = document.querySelectorAll(".css-1dbjc4n.r-xoduu5.r-1udh08x");
	for (var i = 0; i <replies.length; i++){
		replies[i].innerText = null;
	}
	
	var trending = document.querySelectorAll(".css-901oao.r-111h2gw.r-1qd0xha.r-a023e6.r-16dba41.r-ad9z0x.r-bcqeeo.r-vmopo1.r-qvutc0");
	for (var i = 0; i < trending.length; i++){
		trending[i].innerText = null;
	}
	var followersAndFollowing = document.querySelectorAll(".css-1dbjc4n.r-18u37iz");
	for (var i = 0; i < followersAndFollowing.length; i++){
		if(followersAndFollowing[i] != null && followersAndFollowing[i].className.localeCompare("css-1dbjc4n r-18u37iz") == 0){
			followersAndFollowing[i].remove();
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
	}else if (msg.answer.includes("twitter")){
		setInterval(twitter, 1000);
	}
});