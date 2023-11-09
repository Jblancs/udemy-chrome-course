const timeElement = document.getElementById("time");
const nameElement = document.getElementById("name");
const timerElement = document.getElementById("timer");

function updateTimeElements() {

    // this will only show time at open. Needs to be wrapped in function to continuously update
    chrome.storage.local.get(["timer", "isRunning"], (res) => {
        const time = res.timer ?? 0
        timerElement.textContent = `The timer is at ${time} seconds`
    })

    const currentTime = new Date().toLocaleTimeString();
    timeElement.textContent = `The time is: ${currentTime}`;
}

// must call once since setInterval only fires after 1 second
// updateTimeElements()
// calls function every second
// setInterval(updateTimeElements, 1000)

chrome.action.setBadgeText(
  {
    text: "TIME",
  },
  () => {
    console.log("Finished setting badge text.");
  }
);

chrome.storage.sync.get(
  ["name"],
  (res) => {
    // sets name to variable if it has value or string
    const name = res.name ?? "???"
    nameElement.textContent = `Your name is: ${name}`;
  },
);

const startBtn = document.getElementById("start")
const stopBtn = document.getElementById("stop")
const resetBtn = document.getElementById("reset")

startBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isRunning: true
    })
})

stopBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isRunning: false
    })
})

resetBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        timer: 0,
        isRunning: false
    })
})
