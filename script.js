document.getElementById('routeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const { route, cost } = findShortestRoute(source, destination);
    document.getElementById('route').innerText = `Route: ${route.join(' -> ')}`;
    document.getElementById('cost').innerText = `Cost: ${cost}`;
});

// Define the graph using Create_Metro_Map
const graph = {};

function addVertex(vertex) {
    if (!graph[vertex]) {
        graph[vertex] = {};
    }
}

function addEdge(vertex1, vertex2, weight) {
    if (!graph[vertex1]) {
        addVertex(vertex1);
    }
    if (!graph[vertex2]) {
        addVertex(vertex2);
    }
    graph[vertex1][vertex2] = weight;
    graph[vertex2][vertex1] = weight; // Assuming undirected graph
}

function createMetroMap() {
    addVertex("Noida Sector 62~B");
    addVertex("Botanical Garden~B");
    addVertex("Yamuna Bank~B");
    addVertex("Rajiv Chowk~BY");
    addVertex("Vaishali~B");
    addVertex("Moti Nagar~B");
    addVertex("Janak Puri West~BO");
    addVertex("Dwarka Sector 21~B");
    addVertex("Huda City Center~Y");
    addVertex("Saket~Y");
    addVertex("Vishwavidyalaya~Y");
    addVertex("Chandni Chowk~Y");
    addVertex("New Delhi~YO");
    addVertex("AIIMS~Y");
    addVertex("Shivaji Stadium~O");
    addVertex("DDS Campus~O");
    addVertex("IGI Airport~O");
    addVertex("Rajouri Garden~BP");
    addVertex("Netaji Subhash Place~PR");
    addVertex("Punjabi Bagh West~P");
    
    addEdge("Noida Sector 62~B", "Botanical Garden~B", 8);
    addEdge("Botanical Garden~B", "Yamuna Bank~B", 10);
    addEdge("Yamuna Bank~B", "Vaishali~B", 8);
    addEdge("Yamuna Bank~B", "Rajiv Chowk~BY", 6);
    addEdge("Rajiv Chowk~BY", "Moti Nagar~B", 9);
    addEdge("Moti Nagar~B", "Janak Puri West~BO", 7);
    addEdge("Janak Puri West~BO", "Dwarka Sector 21~B", 6);
    addEdge("Huda City Center~Y", "Saket~Y", 15);
    addEdge("Saket~Y", "AIIMS~Y", 6);
    addEdge("AIIMS~Y", "Rajiv Chowk~BY", 7);
    addEdge("Rajiv Chowk~BY", "New Delhi~YO", 1);
    addEdge("New Delhi~YO", "Chandni Chowk~Y", 2);
    addEdge("Chandni Chowk~Y", "Vishwavidyalaya~Y", 5);
    addEdge("New Delhi~YO", "Shivaji Stadium~O", 2);
    addEdge("Shivaji Stadium~O", "DDS Campus~O", 7);
    addEdge("DDS Campus~O", "IGI Airport~O", 8);
    addEdge("Moti Nagar~B", "Rajouri Garden~BP", 2);
    addEdge("Punjabi Bagh West~P", "Rajouri Garden~BP", 2);
    addEdge("Punjabi Bagh West~P", "Netaji Subhash Place~PR", 3);
}

// Call the function to create the metro map
createMetroMap();

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

const sourceInput = document.getElementById('source');
const destinationInput = document.getElementById('destination');
const sourceOptions = document.getElementById('sourceOptions');
const destinationOptions = document.getElementById('destinationOptions');

// Array of available stations
const stations = [
    "Noida Sector 62~B",
    "Botanical Garden~B",
    "Yamuna Bank~B",
    "Rajiv Chowk~BY",
    "Vaishali~B",
    "Moti Nagar~B",
    "Janak Puri West~BO",
    "Dwarka Sector 21~B",
    "Huda City Center~Y",
    "Saket~Y",
    "Vishwavidyalaya~Y",
    "Chandni Chowk~Y",
    "New Delhi~YO",
    "AIIMS~Y",
    "Shivaji Stadium~O",
    "DDS Campus~O",
    "IGI Airport~O",
    "Rajouri Garden~BP",
    "Netaji Subhash Place~PR",
    "Punjabi Bagh West~P"
];

// Function to populate options for source and destination
function populateOptions(input, optionsElement) {
    optionsElement.innerHTML = '';
    stations.forEach(station => {
        const option = document.createElement('li');
        option.textContent = station;
        option.addEventListener('click', () => {
            input.value = station;
            optionsElement.innerHTML = '';
        });
        optionsElement.appendChild(option);
    });
}

// Event listeners to populate options when input is focused
sourceInput.addEventListener('focus', () => {
    populateOptions(sourceInput, sourceOptions);
});

destinationInput.addEventListener('focus', () => {
    populateOptions(destinationInput, destinationOptions);
});

// Event listener to hide options when clicking outside the autocomplete
document.addEventListener('click', (event) => {
    if (!event.target.closest('.autocomplete')) {
        sourceOptions.innerHTML = '';
        destinationOptions.innerHTML = '';
    }
});

// Prevent form submission on enter key press
document.getElementById('routeForm').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});
