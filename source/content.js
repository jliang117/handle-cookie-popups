import optionsStorage from './options-storage.js';

console.log('💈 Content script loaded for', chrome.runtime.getManifest().name);
async function init() {
  const options = await optionsStorage.getAll();
  const color = 'rgb(' + options.colorRed + ', ' + options.colorGreen + ',' + options.colorBlue + ')';
  const text = options.text;
  const notice = document.createElement('div');
  notice.innerHTML = text;
  document.body.prepend(notice);
  notice.id = 'text-notice';
  notice.style.border = '2px solid ' + color;
  notice.style.color = color;
}

init();

function findCookieButtons() {
  // Find all elements on the page that contain the word "cookie"
  const elements = document.querySelectorAll('[*|=*cookie*]');
  const buttons = [];

  // Loop through the elements and find any buttons within them
  for (const element of elements) {
    const buttonElements = element.querySelectorAll('button');
    for (const buttonElement of buttonElements) {
      // Check if the button text contains the words "accept" or "reject" to guess its purpose
      if (buttonElement.innerText.toLowerCase().includes('accept')) {
        buttons.push({
          element: buttonElement,
          type: 'accept'
        });
      } else if (buttonElement.innerText.toLowerCase().includes('reject')) {
        buttons.push({
          element: buttonElement,
          type: 'accept'
        });
      } else {
        buttons.push({
          element: buttonElement,
          type: null,
        });
      }
    }
  }

  return buttons;
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkForCookiePrompt") {
    // Look for a cookie prompt on the page and return whether it was found and the buttons
    const buttons = findCookieButtons()

    if (!buttons.isEmpty()) {
      sendResponse(buttons)
    }
  }
});

