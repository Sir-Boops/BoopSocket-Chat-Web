var ws = new WebSocket('ws://[::1]:7777');

window.onload = function() {

	var textbox = document.getElementById("chatRes");
	console.log(textbox);

	// Enter to submit
	textbox.addEventListener("keypress", function(event){
        	if (event.keyCode == 13) {
                	document.getElementById("submit").click();
        	}
	});
};

ws.onmessage = function(event){

	// Append these messages to the chat box
		var chatBox = document.getElementById('chat');
		chatBox.innerHTML = (chatBox.innerHTML + ('<p>' + event.data + '</p>'));
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
