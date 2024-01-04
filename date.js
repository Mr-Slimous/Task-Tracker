// Selecting DOM elements
const currentDate = document.querySelector(".current-date"); // Selecting the element with the class "current-date"
const currentTime = document.querySelector(".current-time"); // Selecting the element with the class "current-time"
const today = new Date(); // Creating a new Date object to represent the current date and time

// Function to format and return the current date
const getDate = (today) => {
    // Arrays to represent months and days
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Getting the day of the week, day of the month, month, and year
    const day = days[today.getDay()]; // Getting the day of the week using local time
    const date = today.getDate(); // Getting the day of the month using local time
    const month = months[today.getMonth()]; // Getting the month
    const year = today.getFullYear(); // Getting the year

    // Returning a formatted string representing the date
    return `${day}, ${date} ${month} ${year}`;
};

// Setting the innerHTML of currentDate with the formatted date
currentDate.innerHTML = getDate(today);

// Function to display and update the current time
const getTime = () => {
    const date = new Date(); // Creating a new Date object to represent the current date and time
    currentTime.innerHTML = date.toLocaleTimeString(); // Setting the innerHTML of currentTime with the formatted time
};

// Updating the current time every second using setInterval
setInterval(getTime, 1000);
