
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomTimeCallbackLong() {
    return async () => {
        const timeout = Math.floor(Math.random() * (6000 - 3000) + 3000);
        await wait(timeout);

        console.log(`done: timeout ${timeout}`);
    }
}

function getRandomTimeCallbackMedium() {
    return async () => {
        const timeout = Math.floor(Math.random() * (3000 - 100) + 1000);
        await wait(timeout);

        console.log(`done: timeout ${timeout}`);
    }
}

/** @param {number} timeout  */
function getTimeoutCallback(timeout) {
    return async () => {
        if (!timeout) {
            timeout = getRandomTimeCallbackMedium();
        }

        await wait(timeout);
        console.log(`done: timeout ${timeout}`);
    }
}

//get from env?
const apiUrl = "http://localhost:7070/true-random-duration"
// api call callback
// just make a callback / api handles "randomenes" future params could be an option
function getApiCallback() {
    return async () => {
        const response = await fetch(apiUrl, { signal: AbortSignal.timeout(1000) });
        // implement handling of errors / requeing / working with retries
        console.log(response);
    }
}

export {
    getApiCallback,
    getTimeoutCallback,
    getRandomTimeCallbackLong,
    getRandomTimeCallbackMedium
}

