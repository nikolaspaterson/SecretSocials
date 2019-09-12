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
	
	var likes = document.querySelectorAll('div.Igw0E'); //Removes number of likes and liked by specific person
	console.log("likes are");
	console.log(likes.length);
	likes.remove();
	
	var views = document.querySelectorAll('div.HbPOm'); //Removes number of video views
	console.log(views.length);
	views.remove();
}
/*
var elem2 = document.querySelector('div.qn-0x');
elem2.childNodes.remove();
*/

function youtube(selector){
	//document.getElementById("metadata-line").getElementsByTagName("span")[0].innerHTML="";
	//var views = document.querySelector('div.style-scope');
	//document.getElementById("metadata-line").innerHTML = "";
	/*var metadata = document.getElementById("metadata-line");
	console.log(metadata);
	var views = metadata.childNodes[0];
	console.log(views);
	console.log(metadata.childNodes[1]);
	views.remove();
	/**if (views != null){
		views.remove();
	}**/

	//-----Home page-----
	/*var views = document.getElementById("metadata-line");
	var split = views.getElementsByClassName(style-ScopedCredential.ytd-grid-video-renderer);
	console.log(split);*/
	//-----Video-----
	
	/*look into replacing message passing with location.href, maybe in background use setinterval to monitor for url change
	  between the same company like youtube.com/1234 to youtube.com/9876.*/

	if(selector.includes("watch?v=")){
		console.log("location is " + location.href);
		console.log("Watching Video");
		console.log(selector);
		//Removes number of views on current video
		//++++++++++++++++++++INCOMPLETE+++++++++++++++++++++++++++
		//Remove number of subscribers
		document.getElementById("owner-sub-count").innerHTML = "";
		//remove likes & dislikes
		document.querySelectorAll(YT_LIKE_AND_DISLIKE)[1].innerText = ""; //Likes
		document.querySelectorAll(YT_LIKE_AND_DISLIKE)[3].innerText = ""; //Dislikes
		document.getElementById(YT_LIKE_AND_DISLIKE_BAR).innerHTML = ""; //Like & dislike bar
		//remove views on recommended videos
		var recommendVideos = document.querySelectorAll(YT_RECOMMENDED_VIDEO_VIEWS);
		for (var i = 0; i < recommendVideos.length; i++){
			if(recommendVideos[i].id.localeCompare(YT_RECOMMENDED_VIDEO_VIEWS_ID) == 0){
				recommendVideos[i].innerText = "";
			}
		}
		//remove number of comments
		document.querySelectorAll(YT_NUMBER_OF_COMMENTS)[0].innerText = "Comments";
		//remove number of likes on comments
		var commentLikes = document.querySelectorAll(YT_NUMBER_OF_COMMENT_LIKES);
		for(var i = 0; i < commentLikes.length; i++){
			if(commentLikes[i].id.localeCompare(YT_NUMBER_OF_COMMENT_LIKES_ID) == 0){
				commentLikes[i].innerText = "";
			}
		}
		//remove number of replies to comments
		var commentReplies = document.querySelectorAll(YT_NUMBER_OF_COMMENT_REPLIES);
		for (var i = 0; i < commentReplies.length; i++){
			if(commentReplies[i].id.localeCompare(YT_NUMBER_OF_COMMENT_REPLIES_ID)){
				commentReplies[i].innerHTML = "View replies";
			}
		}
	}	
	//-----Channel-----
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
		setInterval(youtube(msg.answer), 500);
	}
});