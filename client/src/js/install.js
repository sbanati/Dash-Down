const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Store triggered events 
    console.log("beforeinstallprompt fired");
    console.log(event);
    window.deferredPrompt = event;

    // Remove the hidden class from the button
    butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // console.log(event);
    const promptEvent = window.deferredPrompt;
    // console.log(promptEvent);
    if (!promptEvent) {
        return;
    }

    // show prompt 
    promptEvent.prompt();

    // Reset deffered prompt variable b/c its one time use
    window.deferredPrompt = null;

    butInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clear prompt 
    window.deferredPrompt = null;
});
