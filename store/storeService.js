const { KeyValueStorage } = require('./keyValueStorage');
const storage = new KeyValueStorage();

async function processMessages(messages, priorityCallback) {
    if (messages) {
        const mostRecentDate = await storage.read(process.env.LAST_INCIDENT_STORAGE_KEY);
        const currentEventDate = messages.reduce((acc, message) => {
            const ts = priorityCallback(message)
                ? new Date(message.incident.priority.created_at).getTime()
                : 0;
            return Math.max(acc, ts);
        }, 0);

        if (currentEventDate > mostRecentDate) {
            await storage.write(process.env.LAST_INCIDENT_STORAGE_KEY, currentEventDate);
        }
    }
}

module.exports = { processMessages };