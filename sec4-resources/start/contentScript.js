// Content Scripts are the main way of interacting with the webpage a user visits

console.log("hello from contentScript");

// to get a tags of a webpage
// const aTags = document.getElementsByTagName("a"); //returns array
// for (const tag of aTags) {
// changes it to Hello World!
// tag.textContent = "Hello World!"

// highlight any a tags with letter i
//   if (tag.textContent.includes("i")) {
//     tag.style = "background-color: yellow;";
//   }

// How do popup, background and contentScript interact? ---------------------------
//
const text = [];

const aTags = document.getElementsByTagName("a"); //returns array
for (const tag of aTags) {
  text.push(tag.textContent);
}

// if we want background.js to have access to text array
chrome.storage.local.set({
  text,
});

// send message to background.js in order to get updated storage
chrome.runtime.sendMessage(null, text, (response) => {
  console.log(`I'm from send response: ${response}`);
}); // id, what we want to send, function for background to call and respond

// get message from bg directly
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  console.log(sender);
});
