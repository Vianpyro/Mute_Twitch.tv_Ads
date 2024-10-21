let muteButtonClicked = false;  // Track if the mute button was clicked initially
let adElementFound = false;     // Track if the Ad element was found

// Function to click the Mute button if it's available
function clickMuteButton() {
    const muteButton = document.querySelector('[aria-label="Mute (m)"]');

    if (muteButton && !muteButtonClicked) {
        console.log('Mute button clicked for the first time.');
        muteButton.click();  // Click the mute button
        muteButtonClicked = true;  // Mark the button as clicked
    }
}

// Function to check if the Ad element appears
function checkForAdElement() {
    const adElement = document.querySelector('[aria-label="Ad"]');

    if (adElement && !adElementFound) {
        console.log('Ad element detected.');
        adElementFound = true;  // Mark that the Ad element was found
        clickMuteButton();  // Try to click the mute button when Ad appears
    } else if (!adElement && adElementFound) {
        console.log('Ad element disappeared.');
        adElementFound = false;  // Reset the Ad element detection
        if (muteButtonClicked) {
            // If the mute button was clicked, click it again when Ad disappears
            const muteButton = document.querySelector('[aria-label="Unmute (m)"]');
            if (muteButton) {
                console.log('Mute button clicked again after Ad disappeared.');
                muteButton.click();
                muteButtonClicked = false;  // Reset to allow re-clicking on next Ad
            }
        }
    }
}

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            checkForAdElement();  // Check for the Ad when the DOM changes
        }
    }
});

// Start observing the document's body for changes in the child elements
observer.observe(document.body, {
    childList: true,  // Watch for child node changes
    subtree: true     // Monitor the entire subtree
});

// Run the check immediately in case the Ad element is already present
checkForAdElement();
