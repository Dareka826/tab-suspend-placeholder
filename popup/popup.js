
// Toggle a page between suspended/not-suspended URL
function togglePageSuspension(url, title) {
	let suspendedURL = browser.extension.getURL("/suspended/suspended.html");
	let newURL = "";

	if(url.startsWith(suspendedURL)) {
		console.log("Suspended tab");

		//let tabTitle = url.match(/title=([^&]*)&/)[1];
		let tabURL = url.match(/url=(.*)/)[1];
		newURL = tabURL;
	} else {
		console.log("Non-suspended tab");
		newURL = suspendedURL + "?title=" + title + "&url=" + url;
	}

	browser.tabs.update(
		{ "url": newURL }
	);
}

document.addEventListener("click", (e) => {

	// If "Suspend/Unsuspend" button clicked
	if(e.target.id == "toggle-current")
		browser.tabs.query({currentWindow: true, active :true}).then((x) => {
			let tabURL = x[0].url;
			let tabTitle = x[0].title;
			togglePageSuspension(tabURL, tabTitle);
		});

});

