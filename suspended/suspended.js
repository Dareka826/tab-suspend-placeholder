let $ = function (id) { return document.getElementById(id); };

// Get DOM elements
let pageTitle    = $("page-title");
let pageURL      = $("page-url");
let pageImg      = $("page-img");
let unsuspendBtn = $("unsuspend-btn");

// If string exceeds maxlen, shorten it and add "..."
function limitLen(text, maxlen) {
    if(text.length <= maxlen) return text;
    return text.substr(0, maxlen-3) + "...";
}

// Max length definitions
let maxTitleLen = Infinity;
let maxUrlLen = Infinity;

// Argument parsing
let parameters = new URLSearchParams(window.location.search);
let p_title  = decodeURI(parameters.get("title") || "");
let p_imgURL = decodeURI(parameters.get("img")   || "");
let p_url    = decodeURI(parameters.get("url")   || "");

// Set title on page
pageTitle.innerText = limitLen(p_title, maxTitleLen);
// Set the tab title
document.title = p_title;

// Set original url
pageURL.innerText = limitLen(p_url, maxUrlLen);

// Add image if one is specified
if(p_imgURL != "") {
    let img = document.createElement("img");
    pageImg.appendChild(img);
    img.src = p_imgURL;
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
