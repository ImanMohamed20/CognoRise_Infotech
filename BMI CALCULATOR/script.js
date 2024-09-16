
document.getElementById('bmi-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting normally

    // Get user input
    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('height').value);

    // Convert height from cm to meters
    const heightM = heightCm / 100;

    // Calculate BMI
    const bmi = weight / (heightM * heightM);

    // Determine BMI category
    let category = '';
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }

    // Display the result
    document.getElementById('result').innerHTML = `
        <p>Your BMI is ${bmi.toFixed(2)}.</p>
        <p>Category: ${category}</p>
    `;
});
