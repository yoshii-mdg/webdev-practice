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

// Backend Weather API Key

const apiKey = "797dabf40a32901d8fd4f247e0e92cb1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".location-input");
const searchBtn = document.querySelector(".search-btn");

async function checkWeather(city) {
    if (!validateCity(city)) {
        return;
    }
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = "Humitity: " + data.main.humidity + "%";
        document.querySelector(".condition").innerHTML = data.weather[0].main;
        document.querySelector(".precipitation").innerHTML = "Precipitation: " + Math.round(data.main.feels_like) + "%";
        document.querySelector(".date").innerHTML = new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        document.querySelector(".wind").innerHTML = "Wind Speed: " + data.wind.speed + " km/h";
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
    document.querySelector(".location-input").value = " "
})

// Validation City should not empty and in
function validateCity(city) {
    if (!city) {
        alert("Please enter a city name.");
        return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(city)) {
        alert("City name should contain only letters and spaces.");
        return false;
    }
    return true;
}

searchBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
        document.querySelector(".location-input").value = " "
    }
});