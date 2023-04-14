document.getElementById("copyAllTabs").addEventListener("click", copyAllTabs);
document.getElementById("copyFiltered").addEventListener("click", copyFilteredTabs);
document.getElementById("copyTabGroup").addEventListener("click", copyTabGroup);

function copyAllTabs() {
    chrome.tabs.query({}, (tabs) => {
        let urls = tabs.map((tab) => tab.url).join("\n");
        copyToClipboard(urls);
        alert("All URLs copied!");
    });
}

function copyFilteredTabs() {
    let filter = document.getElementById("filter").value.trim();
    if (!filter) {
        alert("Please enter a keyword or website to filter.");
        return;
    }

    chrome.tabs.query({}, (tabs) => {
        let filteredUrls = tabs
            .filter((tab) => tab.url.includes(filter))
            .map((tab) => tab.url)
            .join("\n");

        if (filteredUrls) {
            copyToClipboard(filteredUrls);
            alert("Filtered URLs copied!");
        } else {
            alert("No URLs found matching the filter.");
        }
    });
}

function copyTabGroup() {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
        let activeTab = tabs.find((tab) => tab.active);
        if (activeTab.groupId === -1) {
            alert("No tab group found for the active tab.");
            return;
        }

        let groupTabs = tabs.filter((tab) => tab.groupId === activeTab.groupId);
        let urls = groupTabs.map((tab) => tab.url).join("\n");
        copyToClipboard(urls);
        alert("Tab group URLs copied!");
    });
}

function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}
