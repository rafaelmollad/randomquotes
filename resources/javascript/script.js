var request = new XMLHttpRequest();
request.open("GET", "https://random-quote-generator.herokuapp.com/api/quotes/", true);
request.send();

var colors = ['#f1c40f', '#34495e', '#2ecc71', '#e74c3c', '#d35400', '#3498db'];
var twitterWebIntent = "https://twitter.com/intent/tweet?text=";

// Update quote and author
function updateQuote(quotes, qNumber) {
	document.getElementById("quote").innerHTML = quotes[qNumber]["quote"];
	document.getElementById("author").innerHTML = quotes[qNumber]["author"];
}

// Generate a random number
function randomNumber(number) {
	return Math.floor(Math.random() * number);
}

// Change background color
function changeBackground() {
	document.body.style.background = colors[randomNumber(colors.length)];

}

request.onreadystatechange = function() {
	if (request.readyState == 4) {
		if (request.status == 200) {
			// Transform JSON to a Javascript object
			var data = JSON.parse(request.responseText);

			// Change background color
			changeBackground();

			// Generate a random quote
			var quoteNumber = randomNumber(data.length);
			
			// Call function to update quote and author
			updateQuote(data, quoteNumber);

			// First quote as default for sharing
			var shareQuote = twitterWebIntent + data[quoteNumber]["quote"] + " by " + data[quoteNumber]["author"] + "&hashtags=randomquotes"; 

			// If user clicks new quote buttton, move to next quote in data
			document.getElementById("new-quote").onclick = function() {

				// Generate a random quote
				var quoteNumber = randomNumber(data.length);

				// Call function to update quote and author
				updateQuote(data, quoteNumber);

				// Update twitter share url when user clicks new quote
				shareQuote = twitterWebIntent + data[quoteNumber]["quote"] + " by " + data[quoteNumber]["author"] + "&hashtags=randomquotes";

				// Change background color
				changeBackground();

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

