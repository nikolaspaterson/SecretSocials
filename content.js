function instagram(){
	
	var likes = document.querySelector('div.Igw0E'); //Removes number of likes and liked by specific person
		likes.remove();
	
	var views = document.querySelector('div.HbPOm'); //Removes number of video views
		views.remove();
}
/*
var elem2 = document.querySelector('div.qn-0x');
elem2.childNodes.remove();
*/

function youtube(){
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
	//Removes number of views on current video
	document.getElementById("info-text").innerHTML = "";
	//remove likes & dislikes
	document.querySelectorAll(".style-scope.ytd-toggle-button-renderer.style-text")[1].innerText = ""; //Likes
	document.querySelectorAll(".style-scope.ytd-toggle-button-renderer.style-text")[3].innerText = ""; //Dislikes
	document.getElementById("sentiment").innerHTML = ""; //Like & dislike bar
	//remove number of subscribers on subscribe button
	document.querySelectorAll(".style-scope.yt-formatted-string.deemphasize")[0].innerText = "";
		//remove views on recommended videos
	document.querySelectorAll(".style-scope.ytd-video-meta-block")[0].innerText = ""; //only works on first video
		//remove number of comments
	document.querySelectorAll(".count-text.style-scope.ytd-comments-header-renderer")[0].innerText = "Comments";
		//remove number of likes on comments
	console.log(document.querySelectorAll(".style-scope.ytd-comment-action-buttons-renderer"));
	document.querySelectorAll(".style-scope.ytd-comment-action-buttons-renderer")[0].innerText = ""; //only works on first comment
		//remove number of replies to comments

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
		setInterval(youtube, 500);
	}
});