showSavedURL();
addEventListeners();

function addEventListeners() {
    document.querySelector("form").addEventListener("submit", saveOptions);
}


function saveOptions(e) {
    e.preventDefault();
    let url = document.getElementById("newURL").value;
    if (validURL(url)) {
        updateSavedURL(url);
    }
}

function validURL(str) {
    let pattern = new RegExp("^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", "i"); // fragment locator
    return !!pattern.test(str);
}

function updateSavedURL(url) {
    chrome.storage.sync.set({
        newTabUrl: url
    });
    showCurrentURL(url);
    document.querySelector("form").reset();
}

function showSavedURL() {
    document.addEventListener("DOMContentLoaded", function (event) {
        chrome.storage.sync.get(["newTabUrl"], (result) => {
            if (result.newTabUrl) {
                showCurrentURL(result.newTabUrl);
            }
        });
    });
}

function showCurrentURL(url) {
    let currentUrl = document.getElementById("currentURL");
    currentUrl.innerHTML = `The current new tab URL is: ${url}`;
    currentUrl.style.display = currentUrl.style.display === "none" ? "" : "none";
}

