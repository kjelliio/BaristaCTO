// Timing constants for each coffee
const coffeePreparationTimes = {
    coffee1: 50,   // 5 seconds
    coffee2: 100,  // 30 seconds
    coffee3: 100   // 1 minute
};

// Initialize loading bars
const loadingBars = {
    coffee1: document.getElementById('bar1'),
    coffee2: document.getElementById('bar2'),
    coffee3: document.getElementById('bar3')
};

let greencoffees = 0;
let greycoffees = 0;
let browncoffees = 0;


// Function to start the coffee preparation and update the loading bar
function prepareCoffee(coffeeType) {
    const preparationTime = coffeePreparationTimes[coffeeType];
    const loadingBar = loadingBars[coffeeType];
    
    // Reset and start the loading bar animation
    loadingBar.style.width = '0%';
    
    // Update the loading bar incrementally
    let startTime = Date.now();
    const interval = 100; // Update every 100ms
    const totalSteps = preparationTime / interval;
    
    const updateBar = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min((elapsedTime / preparationTime) * 100, 100);
        loadingBar.style.width = `${progress}%`;
        
        if (elapsedTime < preparationTime) {
            requestAnimationFrame(updateBar);
        } else {
            // Reset loading bar after preparation
            setTimeout(() => {
                loadingBar.style.width = '0%';
            }, 1000); // Keep the bar full for 1 second before resetting
        }
    };
    
    console.log(`Preparing ${coffeeType}. It will take ${preparationTime / 1000} seconds.`);
    requestAnimationFrame(updateBar);
    
    setTimeout(() => {
       console.log(`${coffeeType} is ready!`);


    }, preparationTime);
}

// Add event listeners to the coffee buttons
document.getElementById('coffee1').addEventListener('click', () => prepareCoffee('coffee1'));
document.getElementById('coffee2').addEventListener('click', () => prepareCoffee('coffee2'));
document.getElementById('coffee3').addEventListener('click', () => prepareCoffee('coffee3'));
