window.onload = function() {

	var textbox = document.getElementById("chatRes");

	// Enter to submit
	textbox.addEventListener("keypress", function(event){
        	if (event.keyCode == 13) {
                	document.getElementById("submit").click();
        	}
	});
};
