
// Toggle a page between suspended/not-suspended URL
function togglePageSuspension(url, title) {
	let suspendedURL = browser.extension.getURL("/suspended/suspended.html");
	let newURL = "";

	// Flip URL between suspended and not-suspended version
	if(url.startsWith(suspendedURL)) {
		let tabURL = url.match(/url=(.*)/)[1];
		newURL = decodeURI(tabURL);
	} else
		newURL = suspendedURL +
			"?title=" + encodeURI(title)
			+ "&url=" + encodeURI(url);

	// Change tab to new URL
	browser.tabs.update(
		{ "url": newURL }
	);
}

document.addEventListener("click", (e) => {

	// If "Suspend/Unsuspend" button clicked
	if(e.target.id == "toggle-current")
		// Query current tab for data
		browser.tabs.query({currentWindow: true, active :true}).then((x) => {
			let tabURL = x[0].url;
			let tabTitle = x[0].title;
			
			// Make a new URL using page title and URL
			togglePageSuspension(tabURL, tabTitle);
		});

});

