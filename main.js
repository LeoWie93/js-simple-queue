import { getRandomTimeCallbackMedium, getRandomTimeCallbackLong, getTimeoutCallback, getApiCallback } from "./callbackProvider.js";
import { enqueue } from "./queue.js"

enqueue(getApiCallback());

enqueue(getRandomTimeCallbackLong());

enqueue(getTimeoutCallback(400));

enqueue(getTimeoutCallback(800));

enqueue(getApiCallback());

enqueue(getTimeoutCallback(50));

enqueue(getTimeoutCallback(600));

enqueue(getRandomTimeCallbackLong());

enqueue(getApiCallback());

enqueue(getRandomTimeCallbackMedium());

enqueue(getApiCallback());

