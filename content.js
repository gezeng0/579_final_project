// Define the keyboard shortcut keys
const CMD_KEY = "Meta"; // "Meta" is the key code for the Command key
const SHIFT_KEY = "Shift";
const X_KEY = "x";

// Variables to track whether the keyboard shortcut keys are pressed
let isCmdPressed = false;
let isShiftPressed = false;
let isXPressed = false;

// Event listeners to track keydown and keyup events to detect the keyboard shortcut
document.addEventListener("keydown", event => {
  if (event.key === CMD_KEY) {
    isCmdPressed = true;
  }
  if (event.key === SHIFT_KEY) {
    isShiftPressed = true;
  }
  if (event.key === X_KEY) {
    isXPressed = true;
  }

  // Check if all three keys are pressed simultaneously
  if (isCmdPressed && isShiftPressed && isXPressed) {
    handleShortcut(); // Call function to handle the shortcut action
  }
});

document.addEventListener("keyup", event => {
  if (event.key === CMD_KEY) {
    isCmdPressed = false;
  }
  if (event.key === SHIFT_KEY) {
    isShiftPressed = false;
  }
  if (event.key === X_KEY) {
    isXPressed = false;
  }
});

// Function to handle the shortcut action
const handleShortcut = () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText !== "") {
    const pageInfo = {
      title: document.title,
      url: window.location.href
    };

    chrome.runtime.sendMessage({ action: "getCitation", selectedText, pageInfo}, response => {
      if (response) {
        copyToClipboard(response.citation);
        alert("Citation copied to clipboard:\n" + response.citation);

        // console.log(isCmdPressed, isShiftPressed, isXPressed);
        // Reset the state of the keys after citation action is executed
        isCmdPressed = false;
        isShiftPressed = false;
        isXPressed = false;
      }
    });
  }
};

// Function to copy text to the clipboard
const copyToClipboard = text => {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('successfully copied text to clipboard!');
    })
    .catch(err => {
      console.error('Error copying text: ', err);
    });
};
