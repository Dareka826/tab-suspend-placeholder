// Toggle a page between suspended/not-suspended URL
function togglePageSuspension(url, title) {
    let suspendedURL = browser.extension.getURL("/suspended/suspended.html");
    let newURL = "";

    // Flip URL between suspended and not-suspended version
    if(url.startsWith(suspendedURL)) {
        // Retriever original URL
        let parameters = new URLSearchParams(url);
        newURL = decodeURI(parameters.get("url") || "");

    } else {
        // Create parameters for suspended page
        let parameters = new URLSearchParams();
        parameters.set("title", encodeURI(title));
        parameters.set("url", encodeURI(url));

        // Youtube thumbnails; maxresdefault.jpg not always available
        // Check if site is youtube
        if(url.match(/https?:\/\/[^.]*\.?youtube\.com\//) != null) {
            // Try to extract video id
            let vid_id = url.match(/v=([^&]*)/);

            // If video if available
            if(vid_id != null && vid_id.length >= 2 && vid_id[1] != "")
                parameters.set(
                    "img",
                    encodeURI(`https://img.youtube.com/vi/${vid_id[1]}/hqdefault.jpg`)
                );
        }

        newURL = suspendedURL + "?" + parameters.toString();
    }

    // Change tab to new URL
    browser.tabs.update({ "url": newURL });
}

document.addEventListener("click", (e) => {

    // If "Suspend/Unsuspend" button clicked
    if(e.target.id == "toggle-current")
        // Query current tab for data
        browser.tabs.query({currentWindow: true, active :true}).then((tabs) => {
            // Make a new URL using page title and URL
            togglePageSuspension(tabs[0].url, tabs[0].title);
        });

});
