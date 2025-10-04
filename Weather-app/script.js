document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the scrollable container and the buttons (using the IDs from the last answer)
    const scrollContainer = document.getElementById('daily-scrollable');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    
    // 2. Define the scroll distance for 3 cards (3 x 120px + 2 x 20px gap)
    const CARD_WIDTH = 120;
    const GAP = 20;
    
    // *** KEY CHANGE HERE: Calculate the scroll amount for 3 cards ***
    const CARDS_TO_SCROLL = 3;
    // Calculate 3 card widths + 2 gaps (since the first and last card don't have an outer gap)
    const SCROLL_AMOUNT = (CARDS_TO_SCROLL * CARD_WIDTH) + ((CARDS_TO_SCROLL - 1) * GAP); 
    // This value is 400

    // 3. Right Arrow Click scrolls right by 3 cards (400px)
    scrollRightBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: SCROLL_AMOUNT,
            behavior: 'smooth'
        });
    });

    // 4. Left Arrow Click scrolls left by 3 cards (400px)
    scrollLeftBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: -SCROLL_AMOUNT, // Negative value scrolls left
            behavior: 'smooth'
        });
    });
});

const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const city = 'Manila'; // Replace with the desired city

// Function to fetch weather data from OpenWeatherMap API
async function getWeatherData(city, apiKey) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

// Call the function and process the data
getWeatherData(city, apiKey)
    .then(data => {
        if (data) {
            console.log(data); // Process the weather data here
        }
    });