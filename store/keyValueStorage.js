/**
 * TODO: use some storage
 */
class KeyValueStorage {
    constructor() {
    }

    async write(key, value) {
        console.log('Storage write:', key, value);
    }

    async read(key) {
        console.log('Storage read:', key);
        return 0;
    }
}

module.exports = { KeyValueStorage };