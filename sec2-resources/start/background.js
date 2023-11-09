// background > service worker runs in background even when popup is not open

// let time = 0;

// after certain amount of time the service worker goes inactive
// this will reset the time when activated because of time init above
// they stay active only when there is an event

// setInterval does not count as event
// setInterval(() => {
//   time += 1;
//   console.log(time);
// }, 1000);

// -----------------------------
// alarms chrome API allows code to run in background even when service worker goes inactive
chrome.alarms.create("alarm one", {
    periodInMinutes: 1/60
})

// store time in local since we wont use across browsers
chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.storage.local.get(["timer", "isRunning"], (res) => {
        const time = res.timer ?? 0
        const isRunning = res.isRunning ?? true

        if (!isRunning){
            return
        }

        chrome.storage.local.set({
            timer: time + 1
        })
        chrome.action.setBadgeText({
            text: `${time + 1}`
        })
    })
})

console.log(this)
