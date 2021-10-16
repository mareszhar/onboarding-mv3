const button = document.querySelector("button");
button.addEventListener("click", (event) => {
  chrome.permissions.contains(
    {
      origins: ["<all_urls>"],
      permissions: ["tabs"],
    },
    async (permissionExists) => {
      if (permissionExists) {
        alert("you already have that permission");
        const outcome = await chrome.permissions.remove({
          permissions: ["tabs"],
        });
        console.log(outcome);
      } else {
        alert("you don't have those permissions");
        chrome.permissions.request(
          {
            permissions: ["tabs"],
          },
          (granted) => {
            if (granted) {
              alert("thanks!");
            } else {
              alert("ouch, why not?");
            }
          }
        );
      }
    }
  );

  chrome.permissions.request({
    origins: ["<all_urls>"],
  });
});

function requestPermission(permissionsRequest) {
  return new Promise((resolve) => {
    chrome.permissions.request(permissionsRequest, (permissionsGranted) => {
      resolve(permissionsGranted);
    });
  });
}

function removePermission(permissionsRemoval) {
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
