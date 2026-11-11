
const URL = document.getElementById("lil-pins-url");

URL.addEventListener("change", () => {
    let pinURL = URL.value.trim();
    browser.storage.local.set({"lil-pins-url": pinURL});
});
