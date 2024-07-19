$(document).ready(async function() {
    const baseURL = "https://deckofcardsapi.com/api/deck";

    // 1. Request a single card from a newly shuffled deck
    try {
        let response = await fetch(`${baseURL}/new/draw/?count=1`);
        let data = await response.json();
        let card = data.cards[0];
        console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
    } catch (error) {
        console.error('Error:', error);
    }

    // 2. Request a single card, then request another card from the same deck
    try {
        let response = await fetch(`${baseURL}/new/shuffle/`);
        let data = await response.json();
        let deckId = data.deck_id;

        response = await fetch(`${baseURL}/${deckId}/draw/?count=1`);
        let card1 = await response.json();
        console.log(`${card1.cards[0].value.toLowerCase()} of ${card1.cards[0].suit.toLowerCase()}`);

        response = await fetch(`${baseURL}/${deckId}/draw/?count=1`);
        let card2 = await response.json();
        console.log(`${card2.cards[0].value.toLowerCase()} of ${card2.cards[0].suit.toLowerCase()}`);
    } catch (error) {
        console.error('Error:', error);
    }

    // 3. Build an HTML page to draw cards from a deck
    let deckId = null;
    let $btn = $('#draw-card');
    let $cardContainer = $('#card-container');

    try {
        let response = await fetch(`${baseURL}/new/shuffle/`);
        let data = await response.json();
        deckId = data.deck_id;
        $btn.show();
    } catch (error) {
        console.error('Error:', error);
    }

    $btn.on('click', async function() {
        try {
            let response = await fetch(`${baseURL}/${deckId}/draw/?count=1`);
            let data = await response.json();
            if (data.remaining === 0) {
                $btn.hide();
                alert('No more cards left in the deck!');
            } else {
                let card = data.cards[0];
                $cardContainer.append(
                    `<img src="${card.image}" alt="${card.value} of ${card.suit}">`
                );
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
