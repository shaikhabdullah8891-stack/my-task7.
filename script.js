const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");

const result = document.getElementById("result");
const rateInfo = document.getElementById("rateInfo");


async function convertCurrency() {

    const amount = Number(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;


    // Check amount
    if (!amount || amount < 0) {
        result.textContent = "Please enter a valid amount.";
        rateInfo.textContent = "";
        return;
    }


    // Same currency
    if (from === to) {

        result.textContent =
            `${amount.toFixed(2)} ${from} = ${amount.toFixed(2)} ${to}`;

        rateInfo.textContent = "Same currency selected.";

        return;
    }


    result.textContent = "Converting...";
    rateInfo.textContent = "";


    try {

        // Fetch exchange rate from API
        const response = await fetch(
            `https://api.frankfurter.dev/v2/rate/${from}/${to}`
        );


        if (!response.ok) {
            throw new Error("Unable to fetch exchange rate.");
        }


        const data = await response.json();


        // Calculate converted amount
        const convertedAmount = amount * data.rate;


        // Display result
        result.textContent =
            `${amount.toFixed(2)} ${from} = ${convertedAmount.toFixed(2)} ${to}`;


        // Display exchange rate
        rateInfo.textContent =
            `1 ${from} = ${data.rate.toFixed(4)} ${to} • Rate date: ${data.date}`;

    }

    catch (error) {

        result.textContent = "Unable to get exchange rate.";

        rateInfo.textContent =
            "Check your internet connection and try again.";

        console.error(error);
    }
}


// Swap currencies
swapBtn.addEventListener("click", function () {

    const oldFrom = fromCurrency.value;

    fromCurrency.value = toCurrency.value;

    toCurrency.value = oldFrom;


    if (amountInput.value) {
        convertCurrency();
    }
});


// Convert button
convertBtn.addEventListener("click", convertCurrency);


// Press Enter to convert
amountInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        convertCurrency();
    }

});