var ws;

start();

function start() {
	ws = new WebSocket('ws://[::1]:7777');

	ws.onmessage = function(event){

		// Append these messages to the chat box
		var chatBox = document.getElementById('chat');
		chatBox.innerHTML = (chatBox.innerHTML + ('<p>' + event.data + '</p>'));
	};

	ws.onclose = function(event) {

		// Append these messages to the chat box
		var chatBox = document.getElementById('chat');
		chatBox.innerHTML = (chatBox.innerHTML + ('<p style="color: red;">Connection Closed</p>'));

		//Try to reconnect
		setTimeout(function(){
			start();
		}, (5 * 1000));
	};

	ws.onopen = function(event) {
		// Append these messages to the chat box
		var chatBox = document.getElementById('chat');
		chatBox.innerHTML = (chatBox.innerHTML + ('<p style="color: green;">Connected</p>'));
	};

};

// On text submission
function sendRes() {

	//Get textbox text
	var resMessage = document.getElementById("chatRes").value;

	// Turn the message into JSON
	var msg = {
		msg: resMessage
	};

	// Send the message
	ws.send(JSON.stringify(msg));

	//Empty the text box
	document.getElementById("chatRes").value = "";
};
