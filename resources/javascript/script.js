var request = new XMLHttpRequest();
request.open("GET", "https://random-quote-generator.herokuapp.com/api/quotes/", true);
request.send();

var quoteNumber = 0;
var colors = ['#f1c40f', '#34495e', '#2ecc71', '#e74c3c', '#d35400', '#3498db'];
var twitterWebIntent = "https://twitter.com/intent/tweet?text=";

request.onreadystatechange = function() {
	if (request.readyState == 4) {
		if (request.status == 200) {
			// Transform JSON to a Javascript object
			var data = JSON.parse(request.responseText);

			// Show first quote and its author as default
			document.getElementById("quote").innerHTML = data[quoteNumber]["quote"];
			document.getElementById("author").innerHTML = data[quoteNumber]["author"];

			// First quote as default for sharing
			var shareQuote = twitterWebIntent + data[quoteNumber]["quote"] + " by " + data[quoteNumber]["author"] + "&hashtags=randomquotes"; 


			// If user clicks new quote buttton, move to next quote in data
			document.getElementById("new-quote").onclick = function() {
				// Move to next quote
				quoteNumber++;

				// Are we outside of the array limit? If so, go back to first quote
				if (quoteNumber == data.length) {
					quoteNumber = 0; 
				}

				// Update quote and author
				document.getElementById("quote").innerHTML = data[quoteNumber]["quote"];
				document.getElementById("author").innerHTML = data[quoteNumber]["author"];

				// Update twitter share url when user clicks new quote
				shareQuote = twitterWebIntent + data[quoteNumber]["quote"] + " by " + data[quoteNumber]["author"] + "&hashtags=randomquotes";

				// Change background color when user clicks new quote
				var newColor = Math.floor(Math.random() * 6);
				document.body.style.background = colors[newColor];

			}

			// Add href to twitter link
			document.getElementById("twitter-share").onclick = function() {
				this.href=shareQuote;
			}

	} else {
			console.log("An error occured");
		}
	}
}

