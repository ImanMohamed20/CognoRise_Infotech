// script.js

// API endpoint for fetching exchange rates
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

// Elements
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const convertButton = document.getElementById('convert');
const resultDisplay = document.getElementById('result');

// Fetch currencies and populate select options
async function fetchCurrencies() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        // Populate dropdown options
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            fromCurrencySelect.appendChild(option);
            toCurrencySelect.appendChild(option.cloneNode(true));
        });

        // Set default selections
        fromCurrencySelect.value = 'USD';
        toCurrencySelect.value = 'EUR';
    } catch (error) {
        console.error('Error fetching currencies:', error);
        resultDisplay.textContent = 'Failed to load currency data.';
    }
}

// Perform conversion based on user input
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount) || amount <= 0) {
        resultDisplay.textContent = 'Please enter a valid amount.';
        return;
    }

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const rates = data.rates;
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];

        if (fromRate && toRate) {
            const convertedAmount = (amount / fromRate) * toRate;
            resultDisplay.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        } else {
            resultDisplay.textContent = 'Currency conversion error.';
        }
    } catch (error) {
        console.error('Error converting currency:', error);
        resultDisplay.textContent = 'Failed to perform conversion.';
    }
}

// Event listeners
convertButton.addEventListener('click', convertCurrency);

// Initial load
fetchCurrencies();
