const button = document.querySelector("button");
button.addEventListener("click", async () => {
  const permissionsOfInterest = {
    origins: ["<all_urls>"],
  };

  const permissionsExist = await checkPermissions(permissionsOfInterest);

  if (permissionsExist) {
    alert("you already have those permissions");

    chrome.scripting.registerContentScript({
      id: 2,
      matches: ["https://*/*"],
      js: ["contentA.js", "contentB.js"],
      run_at: "document_start",
    });
  } else {
    const permissionsGranted = await requestPermissions(permissionsOfInterest);
    if (permissionsGranted) {
      alert("thanks!");
    } else {
      alert("ouch, why not?");
    }
  }
});

function requestPermissions(permissionsRequest) {
  return new Promise((resolve) => {
    chrome.permissions.request(permissionsRequest, (permissionsGranted) => {
      resolve(permissionsGranted);
    });
  });
}

function removePermissions(permissionsRemoval) {
  return new Promise((resolve) => {
    chrome.permissions.remove(permissionsRemoval, (permissionsRemoved) => {
      resolve(permissionsRemoved);
    });
  });
}

function checkPermissions(permissions) {
  return new Promise((resolve) => {
    chrome.permissions.contains(permissions, (permissionsExist) => {
      resolve(permissionsExist);
    });
  });
}
