var ws;

start();

function start() {
	ws = new WebSocket('ws://[::1]:7777');

	ws.onmessage = function(event){

		//Debug code
		console.log(event.data);

		//Decode the message
		var msg = JSON.parse(event.data);

		// Append these messages to the chat box
		var chatBox = document.getElementById('chat');
		chatBox.innerHTML = (chatBox.innerHTML + ('<p>' +  msg.sender + ': ' + msg.msg + '</p>'));

		// Scroll to the bottom of the div
		var scroll = document.getElementById('chat');
		scroll.scrollTop = scroll.scrollHeight;
	};

	ws.onclose = function(event) {

		// Append these messages to the chat box
		var chatBox = document.getElementById('chat');
		chatBox.innerHTML = (chatBox.innerHTML + ('<p style="color: red;">Connection Lost</p>'));

		// Scroll to the bottom of the div
		var scroll = document.getElementById('chat');
		scroll.scrollTop = scroll.scrollHeight;

		//Try to reconnect
		setTimeout(function(){
			start();
		}, (5 * 1000));
	};

	ws.onopen = function(event) {
		// Append these messages to the chat box
		var chatBox = document.getElementById('chat');
		chatBox.innerHTML = (chatBox.innerHTML + ('<p style="color: green;">Connected</p>'));

		// Scroll to the bottom of the div
		var scroll = document.getElementById('chat');
		scroll.scrollTop = scroll.scrollHeight;
	};

};

// On text submission
function sendRes() {

	var chatBox = document.getElementById('chat');

	//Get textbox text
	var resMessage = document.getElementById("chatRes").value;

	// Turn the message into JSON
	var msg = {
		msg: resMessage
	};

	// Send the message
	ws.send(JSON.stringify(msg));

	//Append what you said to the textbox
	chatBox.innerHTML = (chatBox.innerHTML + ('<p>You: ' + resMessage + '</p>'));

	// Scroll to the bottom of the div
	var scroll = document.getElementById('chat');
	scroll.scrollTop = scroll.scrollHeight;

	//Empty the text box
	document.getElementById("chatRes").value = "";
};
