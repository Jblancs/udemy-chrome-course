// this is a ts file since it will not have react code
// if using react code in this file switch to tsx

console.log('background script')

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg)
  console.log(sender)
  sendResponse('response sent from bg')
})
