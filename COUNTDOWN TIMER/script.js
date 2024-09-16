// script.js
document.addEventListener('DOMContentLoaded', () => {
    const daysElem = document.getElementById('days');
    const hoursElem = document.getElementById('hours');
    const minutesElem = document.getElementById('minutes');
    const secondsElem = document.getElementById('seconds');
    const form = document.getElementById('countdown-form');
    const targetDateInput = document.getElementById('target-date');

    let countdownInterval;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const targetDate = new Date(targetDateInput.value);
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        updateCountdown(targetDate);
        countdownInterval = setInterval(() => updateCountdown(targetDate), 1000);
    });

    function updateCountdown(targetDate) {
        const now = new Date();
        const timeRemaining = targetDate - now;

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            daysElem.textContent = '00';
            hoursElem.textContent = '00';
            minutesElem.textContent = '00';
            secondsElem.textContent = '00';
            return;
        }

        const seconds = Math.floor((timeRemaining / 1000) % 60);
        const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

        daysElem.textContent = formatTime(days);
        hoursElem.textContent = formatTime(hours);
        minutesElem.textContent = formatTime(minutes);
        secondsElem.textContent = formatTime(seconds);
    }

    function formatTime(value) {
        return value < 10 ? `0${value}` : value;
    }
});
