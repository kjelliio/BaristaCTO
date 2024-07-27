// Timing constants for each coffee
const initialCoffeePreparationTimes = {
    coffee1: 100,   // 5 seconds
    coffee2: 100,  // 30 seconds
    coffee3: 100   // 1 minute
};

// Customer colors based on coffee orders
const customerColors = {
    coffee1: 'orange',  // Color for coffee 1
    coffee2: 'grey',  // Color for coffee 2
    coffee3: 'green'    // Color for coffee 3
};

// Variables for points and game speed
let points = 0;
let customerInterval = 3000; // Initial interval for adding new customers
let coffeePreparationTimes = { ...initialCoffeePreparationTimes };

// Array to store customer details
const customers = [];
const maxCustomers = 10; // Maximum number of customers on screen

// Function to update points display
function updatePoints() {
    document.getElementById('points').innerText = points;
}

// Function to create a new customer with two random coffee orders
function createCustomer() {
    if (customers.length >= maxCustomers) {
        gameOver();
        return;
    }

    const coffeeTypes = Object.keys(customerColors);
    
    // Select two different coffee types randomly
    let firstCoffeeType = coffeeTypes[Math.floor(Math.random() * coffeeTypes.length)];
    let secondCoffeeType;
    do {
        secondCoffeeType = coffeeTypes[Math.floor(Math.random() * coffeeTypes.length)];
    } while (secondCoffeeType === firstCoffeeType);

    // Create a new customer object with two coffee orders
    const customer = {
        orders: [firstCoffeeType, secondCoffeeType], // Two different coffee orders
        completedOrders: [], // Track completed orders
        satisfied: false // Satisfaction status
    };

    // Create a visual representation for the customer
    const customerElement = document.createElement('div');
    customerElement.className = 'customer';
    customerElement.style.background = `linear-gradient(${customerColors[firstCoffeeType]}, ${customerColors[secondCoffeeType]})`;
    customerElement.style.width = '50px';
    customerElement.style.height = '50px';
    customerElement.style.position = 'absolute';
    customerElement.style.top = `${Math.random() * (window.innerHeight / 2 - 40) + (window.innerHeight / 2)}px`; // Lower half of the screen
    customerElement.style.left = `${Math.random() * (window.innerWidth - 80)}px`;
    document.body.appendChild(customerElement);

    // Store the element in the customer object for future reference
    customer.element = customerElement;

    // Add the new customer to the array
    customers.push(customer);

    // Log the current state of customers for debugging
    console.log('Current customers:', customers);
}

// Function to mark a coffee order as completed for a customer
function completeOrder(customerIndex, coffeeType) {
    const customer = customers[customerIndex];
    if (customer && customer.orders.includes(coffeeType) && !customer.completedOrders.includes(coffeeType)) {
        customer.completedOrders.push(coffeeType);
        console.log(`Customer ${customerIndex} completed ${coffeeType}.`);

        // Check if the customer is now satisfied
        if (customer.completedOrders.length === customer.orders.length) {
            customer.satisfied = true;
            points += 10; // Add points for satisfaction
            console.log(`Customer ${customerIndex} is satisfied! Points: ${points}`);
            updatePoints(); // Update points display

            // Remove the satisfied customer from the screen
            if (customer.element) {
                customer.element.remove();
            }

            // Remove the satisfied customer from the array
            customers.splice(customerIndex, 1);
        }
    }
}

// Function to simulate making a coffee and notify completion
function prepareCoffee(coffeeType, customerIndex) {
    const preparationTime = coffeePreparationTimes[coffeeType];
    console.log(`Preparing ${coffeeType} for customer ${customerIndex}.`);

    // Simulate coffee preparation time with setTimeout
    setTimeout(() => {
        completeOrder(customerIndex, coffeeType);
    }, preparationTime);
}

// Function to speed up the game
function increaseDifficulty() {
    if (customerInterval > 3000) { // Minimum interval of 3 seconds
        customerInterval -= 1000; // Decrease interval by 1 second every 30 seconds
        console.log(`Increasing difficulty. New customer interval: ${customerInterval} ms`);
    }

    for (const coffeeType in coffeePreparationTimes) {
        if (coffeePreparationTimes[coffeeType] > 2000) { // Minimum preparation time of 2 seconds
            coffeePreparationTimes[coffeeType] -= 500; // Decrease preparation time by 0.5 seconds every 30 seconds
        }
    }
}

// Function to handle game over
function gameOver() {
    // Stop adding new customers and increasing difficulty
    clearInterval(customerSpawnInterval);
    clearInterval(difficultyInterval);

    // Create and display the game over screen
    const gameOverScreen = document.createElement('div');
    gameOverScreen.id = 'gameOverScreen';
    gameOverScreen.style.position = 'fixed';
    gameOverScreen.style.top = '0';
    gameOverScreen.style.left = '0';
    gameOverScreen.style.width = '100%';
    gameOverScreen.style.height = '100%';
    gameOverScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    gameOverScreen.style.color = 'white';
    gameOverScreen.style.display = 'flex';
    gameOverScreen.style.flexDirection = 'column';
    gameOverScreen.style.justifyContent = 'center';
    gameOverScreen.style.alignItems = 'center';
    gameOverScreen.style.fontSize = '40px';
    gameOverScreen.style.fontWeight = 'bold';
    gameOverScreen.style.textAlign = 'center';
    gameOverScreen.innerText = `GAME OVER\nYOU GOT ${points} POINTS!`;
    document.body.appendChild(gameOverScreen);

    // Optionally, stop all game activity or disable buttons here
}

// Start adding customers at a regular interval and increase difficulty
let customerSpawnInterval = setInterval(() => {
    createCustomer();
}, customerInterval); // Add a new customer at the defined interval

let difficultyInterval = setInterval(() => {
    increaseDifficulty();
}, 10000); // Increase difficulty every 30 seconds

// Example: Link coffee buttons to customer orders
document.getElementById('coffee1').addEventListener('click', () => {
    customers.forEach((customer, index) => {
        if (!customer.satisfied) {
            prepareCoffee('coffee1', index);
            return; // Only process one customer per click
        }
    });
});
document.getElementById('coffee2').addEventListener('click', () => {
    customers.forEach((customer, index) => {
        if (!customer.satisfied) {
            prepareCoffee('coffee2', index);
            return; // Only process one customer per click
        }
    });
});
document.getElementById('coffee3').addEventListener('click', () => {
    customers.forEach((customer, index) => {
        if (!customer.satisfied) {
            prepareCoffee('coffee3', index);
            return; // Only process one customer per click
        }
    });
});

// Create and display points element
const pointsElement = document.createElement('div');
pointsElement.id = 'points';
pointsElement.style.position = 'absolute';
pointsElement.style.top = '10px';
pointsElement.style.left = '10px';
pointsElement.style.color = 'black'; // Text color
pointsElement.style.fontSize = '0px'; // Text size
pointsElement.style.fontWeight = 'bold'; // Make text bold
pointsElement.style.textAlign = 'center'; // Center text
document.body.appendChild(pointsElement);

// Initialize points display
updatePoints();
