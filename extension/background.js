addListeners();

function addListeners() {
    chrome.browserAction.onClicked.addListener(() => {
        chrome.storage.sync.get(["newTabUrl"], (result) => {
            let url = result.newTabUrl;
            openNewTab(url);
        });
    });
}

function openNewTab(url) {
    chrome.tabs.create({url: url});
}
