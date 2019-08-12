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

	var metadata = document.getElementById("metadata-line");
	console.log(metadata);
	var views = metadata.childNodes[0];
	console.log(views);
	console.log(metadata.childNodes[1]);
	//views.remove();
	/**if (views != null){
		views.remove();
	}**/
}



var port = chrome.runtime.connect({name: "shareTabInfo"}); //Create groupchat with secret password

port.postMessage({question: "Tell me the url"}); // ask group for the url
console.log("asked for question");

port.onMessage.addListener(function(msg) { //when message is recieved
	console.log("did I get a response?");
	console.log(msg.answer);
  
	if (msg.answer.includes("instagram")){
		console.log(msg.answer);
		setInterval(instagram, 1000);
	}else if(msg.answer.includes("youtube")){
		setInterval(youtube, 50);
	}
});