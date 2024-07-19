$(document).ready(async function() {
    const baseURL = "http://numbersapi.com";
    const favoriteNumber = 7;

    // 1. Get a fact about your favorite number
    try {
        const response = await fetch(`${baseURL}/${favoriteNumber}?json`);
        const data = await response.json();
        $('#number-fact').text(data.text);
    } catch (error) {
        console.error('Error:', error);
    }

    // 2. Get data on multiple numbers in a single request
    const numbers = [3, 7, 10];
    try {
        const response = await fetch(`${baseURL}/${numbers}?json`);
        const data = await response.json();
        const factsList = Object.values(data).map(fact => `<p>${fact}</p>`).join('');
        $('#multiple-facts').html(factsList);
    } catch (error) {
        console.error('Error:', error);
    }

    // 3. Get 4 facts about your favorite number
    const promises = [];
    for (let i = 0; i < 4; i++) {
        promises.push(fetch(`${baseURL}/${favoriteNumber}?json`));
    }

    try {
        const results = await Promise.all(promises);
        const facts = await Promise.all(results.map(res => res.json()));
        const factsList = facts.map(fact => `<p>${fact.text}</p>`).join('');
        $('#favorite-facts').html(factsList);
    } catch (error) {
        console.error('Error:', error);
    }
});
