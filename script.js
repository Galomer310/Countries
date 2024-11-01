async function fetchAllCountries() {
    const loadingMessage = document.getElementById("loading-message");
    const countryContainer = document.getElementById("country-container");

    loadingMessage.style.display = "block";
    
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        
        if (!response.ok) {
            throw new Error("Failed to fetch country data");
        }

        const countries = await response.json();

        loadingMessage.style.display = "none";
        
        countries.forEach(country => displayFlag(country));

    } catch (error) {
        console.error("Error:", error);
        displayError("Error fetching data. Please try again later.");
    }
}

function displayFlag(country) {
    const countryContainer = document.getElementById("country-container");
    
    const flagElement = document.createElement("div");
    flagElement.className = "country";

    flagElement.innerHTML = `
        <img src="${country.flags.png}"/>
        <h3>${country.name.common}</h3>
    `;

    flagElement.addEventListener("click", () => showCountryDetails(country));

    countryContainer.appendChild(flagElement);
}

function showCountryDetails(country) {
    const countryInfo = document.getElementById("country-info");

    countryInfo.innerHTML = `
        <img src="${country.flags.png}" alt="${country.name.common} flag">
        <h3>${country.name.common}</h3>
        <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
        <p>Population: ${country.population.toLocaleString()}</p>
        <p>Region: ${country.region}</p>
        <p>Time Zone: ${country.timezones}</p>
    `;
}

function displayError(message) {
    const countryInfo = document.getElementById("country-info");
    countryInfo.innerHTML = `<p style="color:red;">${message}</p>`;
}

fetchAllCountries();
