const button = document.querySelector("button");
button.addEventListener("click", (event) => {
  chrome.permissions.contains(
    {
      permissions: ["tabs"],
    },
    (permissionExists) => {
      if (permissionExists) {
        alert("you already have that permission");
      } else {
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
