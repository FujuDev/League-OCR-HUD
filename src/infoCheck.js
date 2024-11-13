export class InfoCheck {
    constructor(maxSize = 6) {
        this.queue = [];
        this.maxSize = maxSize;
    }

    // Add en element in the infocheck values
    enqueue(value) {
        if (typeof value !== "number") {
            return;
        }

        if (this.queue.length >= this.maxSize) {
            this.queue.shift();
        }

        this.queue.push(value);
    }

    dequeue() {
        return this.queue.shift();
    }

    size() {
        return this.queue.length;
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    getQueue() {
        return [...this.queue];
    }

    // Afficher les éléments de la file (utile pour le débogage)
    display() {
        console.log("File actuelle :", this.queue);
    }

    /**
     * Determines the most relevant value from a queue based on specific rules:
     * 1. If the last 3 elements in the queue are identical, return that value.
     * 2. If the values are not identical but one value appears most frequently, return the most frequent value.
     * 3. If all elements in the queue are identical, return the most recent (last) value.
     * 4. If the queue is empty, return 0.
     *
     * @returns {number} The determined value based on the rules above.
    */
    determineMostFrequentOrRecent() {
        const elements = this.getQueue();
        if (elements.length === 0) {
            return 0;
        }

        // Verify if the last 3 elements are the same
        const recentValues = elements.slice(-3);
        const areRecentValuesIdentical = recentValues.every(val => val === recentValues[0]);
    
        if (areRecentValuesIdentical && recentValues.length === 3) {
            return recentValues[0];
        }
    
        // Count the occurrences of each element
        const counts = elements.reduce((acc, value) => {
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
    
        // Find the most frequent value
        let mostFrequentValue = elements[0];
        let maxCount = 0;
    
        for (const [value, count] of Object.entries(counts)) {
            if (count > maxCount) {
                maxCount = count;
                mostFrequentValue = parseFloat(value);
            }
        }
    
        // Check if all elements are identical
        const allIdentical = Object.keys(counts).length === 1;
    
        if (allIdentical) {
            return elements[elements.length - 1];
        }

        return mostFrequentValue;
    }
}