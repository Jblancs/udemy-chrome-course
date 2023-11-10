// this is a ts file since it will not have react code
// if using react code in this file switch to tsx

console.log("contentScript Running")
chrome.runtime.sendMessage("From contentScript", (response) => {
    console.log(response)
})
