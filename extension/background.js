let intervalId = null;

function showNotification() {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon48.png',
        title: chrome.i18n.getMessage('notificationTitle'),
        message: chrome.i18n.getMessage('notificationMessage'),
        priority: 2
    });
}

function startTimer(interval) {
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(showNotification, interval * 60 * 1000);
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(['interval'], (result) => {
        const interval = result.interval || 30;
        startTimer(interval);
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateInterval') {
        chrome.storage.sync.get(['interval'], (result) => {
            const interval = result.interval || 30;
            startTimer(interval);
        });
    }
});