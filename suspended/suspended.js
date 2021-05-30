
// If string exceeds maxlen, shorten it and add "..."
function limitLen(text, maxlen) {
	if(text.length <= maxlen) return text;
	return text.substr(0, maxlen-3) + "...";
}

// Get DOM elements
let pageTitle = document.getElementById("page-title");
let pageURL = document.getElementById("page-url");
let pageImg = document.getElementById("page-img");
let unsuspendBtn = document.getElementById("unsuspend-btn");

// Max length definitions
let maxTitleLen = Infinity;
let maxUrlLen = Infinity;

// Get page URL
let data = window.location.href;

// Extract title from URL
pageTitle.innerText = limitLen(
	decodeURI(
		data.match(/[&?]title=([^&]*)&url=/)[1]
	), maxTitleLen
);

// Set the tab title
document.title= pageTitle.innerText;

// Extract unsuspended URL form URL
pageURL.innerText = limitLen(
	decodeURI(
		data.match(/[&?]url=([^&]*)/)[1]
	), maxUrlLen
);

// Add image if one is specified
let imgURL = data.match(/[&?]img=([^&]*)/);
if(imgURL != null) {
	let img = document.createElement("img");
	pageImg.appendChild(img);
	img.src = decodeURI(imgURL[1]);
}

// Add a listener to the button
unsuspendBtn.addEventListener("click", () => {
	try {
		// Navigate to the unsuspended URL
		window.location.href = pageURL.innerText;
	} catch(e) {
		// If an error occurs (probably TypeError for sites like
		// about:devtools), alert it and log
		console.log(e);
		alert(e);
	}
});

