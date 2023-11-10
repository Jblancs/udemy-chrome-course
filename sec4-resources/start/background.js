// .onInstalled event runs one time when extension is installed
// chrome.runtime.onInstalled.addListener((details) => {
//   console.log(details);
// });

// .contextMenus allow you to altar menu when you right click
chrome.runtime.onInstalled.addListener((details) => {
  // store any fields that you might be using later on install
  chrome.storage.local.set({
    shows: [],
  });

  chrome.contextMenus.create({
    title: "Search TV Show",
    id: "contextMenu1",
    contexts: ["page", "selection"],
  });

  //   Data fetch from API ----------------------------------------------
  chrome.contextMenus.onClicked.addListener((event) => {
    fetch(`https://api.tvmaze.com/search/shows?q=${event.selectionText}`)
      .then((res) => res.json())
      .then((data) => {
        // stores data in storage to be used and displayed
        console.log(data);
        chrome.storage.local.set({
          shows: data,
        });
      });
  });

  //   //   add event listener for contextMenu to work ------------------
  //   chrome.contextMenus.onClicked.addListener((event) => {
  //     console.log(event);
  //     // chrome.tabs.query(
  //     //   {
  //     //     // get all tabs of current window
  //     //     currentWindow: true,
  //     //   },
  //     //   (tabs) => {
  //     //     console.log(tabs); // array of tabs
  //     //   }
  //     // );

  //     // creates new tab with url given -----------------------------
  //     chrome.tabs.create({
  //       active: true,
  //       url: `https://m.imdb.com/find/?q=${event.selectionText}&ref_=nv_sr_sm`, //searches imdb for highlighted text
  //     });

  //     // making it so that context menu performs a google search on selected text
  //     // chrome.search.query({
  //     //   disposition: "NEW_TAB",
  //     //   text: `IMDB ${event.selectionText}`,
  //     // });
  //   });

  //   //   create child context menus ----------------------------------
  //   //   would need to filter through id if we want each menu to perform different task
  //   //   chrome.contextMenus.create({
  //   //     title: "Text Context Menu 1",
  //   //     id: "contextMenu2",
  //   //     parentId: "contextMenu1",
  //   //     contexts: ["page", "selection"],
  //   //   });
  //   //   chrome.contextMenus.create({
  //   //     title: "Text Context Menu 2",
  //   //     id: "contextMenu3",
  //   //     parentId: "contextMenu1",
  //   //     contexts: ["page", "selection"],
  //   //   });
});

// // fire onMessage from contentScript --------------------------------
// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   console.log(msg); // shows text array sent from contentScript
//   console.log(sender); // shows sender info (tab, id, etc)
//   console.log(sendResponse); // allows background to respond to contentScript
//   sendResponse("received message - from background");

//   // background script can directly message using tabs.sendMessage
//   //   requires id which can be found in sender
//   chrome.tabs.sendMessage(sender.tab.id, "Got message - bg");
// });
