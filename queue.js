

// guard access via a proxy/semaphore or smth
const queue = [];
const deadLetter = [];
const workerPoolSize = 4;

let runningWorkers = 0;

function enqueue(callback) {
    return new Promise(() => {
        queue.push({ callback: callback, retries: 0 });
        dequeue();
    });
}

async function dequeue() {
    if (runningWorkers >= workerPoolSize) {
        console.log("no free workers");
        return
    }

    if (queue.length === 0) {
        console.debug("queue is emtpy");
        return;
    }

    runningWorkers++;

    const task = queue.shift();

    try {
        await task.callback();
    } catch (e) {
        // handle failed task
        console.error("Task rejected: " + e);
        task.retries++;

        if (task.retries < 3) {
            queue.push(task);
        } else {
            console.log("Reject task, to many retries");
            deadLetter.push(task);
            consol.log("Dead Letter", deadLetter);
        }
    }

    runningWorkers--;
    dequeue();
}

export {
    enqueue,
    dequeue
}

