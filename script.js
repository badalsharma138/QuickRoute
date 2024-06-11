document.getElementById('routeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const { route, cost } = findShortestRoute(source, destination);
    document.getElementById('route').innerText = `Route: ${route.join(' -> ')}`;
    document.getElementById('cost').innerText = `Cost: ${cost}`;
});

// Define the graph
const graph = {
    'A': { 'B': 1, 'C': 4 },
    'B': { 'A': 1, 'C': 2, 'D': 5 },
    'C': { 'A': 4, 'B': 2, 'D': 1 },
    'D': { 'B': 5, 'C': 1 }
};

// Dijkstra's algorithm
function findShortestRoute(source, destination) {
    const distances = {};
    const prev = {};
    const pq = new PriorityQueue();

    for (const vertex in graph) {
        distances[vertex] = Infinity;
        prev[vertex] = null;
    }
    distances[source] = 0;
    pq.enqueue(source, 0);

    while (!pq.isEmpty()) {
        const { element: current } = pq.dequeue();

        if (current === destination) {
            const route = [];
            let temp = current;
            while (temp) {
                route.unshift(temp);
                temp = prev[temp];
            }
            return { route, cost: distances[destination] };
        }

        for (const neighbor in graph[current]) {
            const alt = distances[current] + graph[current][neighbor];
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                prev[neighbor] = current;
                pq.enqueue(neighbor, alt);
            }
        }
    }
    return { route: [], cost: Infinity };
}

// Priority Queue implementation
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(element, priority) {
        this.values.push({ element, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.values.length === 0;
    }
}
