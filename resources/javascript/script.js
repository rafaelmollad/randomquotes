var request = new XMLHttpRequest();
request.open("GET", "https://random-quote-generator.herokuapp.com/api/quotes/", true);
request.send();

var quoteNumber = 0;

request.onreadystatechange = function() {
	if (request.readyState == 4) {
		if (request.status == 200) {
			// Transform JSON to a Javascript object
			var data = JSON.parse(request.responseText);
			console.log(data.length);

			// Show first quote as default
			document.getElementById("quote").innerHTML = data[quoteNumber]["quote"] + "By" + data[quoteNumber]["author"];

			// If user clicks new quote buttton, move to next quote in data
			document.getElementById("newquote").onclick = function() {
				// Move to next quote
				quoteNumber++;

				// Are we outside of the array limit? If so, go back to first quote
				if (quoteNumber == data.length) {
					quoteNumber = 0; 
				}

				// Update quote
				document.getElementById("quote").innerHTML = data[quoteNumber]["quote"] + "By" + data[quoteNumber]["author"];
			}


	} else {
			console.log("An error occured");
		}
	}
}

