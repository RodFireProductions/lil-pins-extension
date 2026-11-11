
function onCreated() {
    if (browser.runtime.lastError) {
        console.log(`Error: ${browser.runtime.lastError.message}`);
    };
};

function createMenuItem() {
    browser.contextMenus.removeAll();
    browser.contextMenus.create({
        id: "lil-pins-adder",
        title: "Add to lil-pins",
        contexts: ["all"]
    }, onCreated);
};

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "lil-pins-adder") {
      browser.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['main.js'],
      })
  };
});

createMenuItem();
