function getPermissions() {
  return new Promise((resolve) => {
    chrome.permissions.getAll((permissions) => {
      resolve(permissions);
    });
  });
}

try {
  //On first install open onboarding
  chrome.runtime.onInstalled.addListener(async (r) => {
    const permissions = await getPermissions();
    console.log("permissions:");
    console.log(permissions);

    // chrome.permissions.getAll((permissions) => {
    //   console.log("permissions:");
    //   console.log(permissions);
    // });

    if (r.reason !== "install") {
      //first install
      //show onboarding page
      chrome.tabs.create({
        url: "onboarding-page.html",
      });
    }
  });

  //ON page change
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) { // <-- can use to grab tabId if not within tabs listener...
    //const tabId = tabs[0].id; // set tabid

    // read changeInfo data and do something with it (like read the url)
    if (
      changeInfo.url &&
      !changeInfo.url.startsWith("https://support.google.com")
    ) {
      console.log(`url is ${changeInfo.url}`);
      //if have all_urls permissions...
      chrome.scripting.executeScript({
        files: ["contentA.js", "contentB.js"],
        target: { tabId: tabId },
      });
    }

    //}); // <-- close extra listener for tabid
  });
} catch (e) {
  console.log("Error: " + e.message);
}
