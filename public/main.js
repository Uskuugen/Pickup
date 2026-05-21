gsap.from(".logo", {
    y: -20,
    opacity: 0,
    duration: 1
});

gsap.from(".profile", {
    scale: 0,
    opacity: 0,
    duration: 0.8,
    delay: 0.2
});

gsap.from(".tag", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.4
});

gsap.from("h1", {
    opacity: 0,
    y: 40,
    duration: 1,
    delay: 0.6
});

gsap.from(".subtext", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.9
});

gsap.from(".cta", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 1.1,
    ease: "back.out(1.7)"
});

gsap.from(".game-card", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.8,
    delay: 1.3
});

// ========================================
// BUTTON HOVER EFFECTS
// ========================================

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("mouseenter", () => {
        gsap.to(button, {
            scale: 1.05,
            duration: 0.2
        });
    });

    button.addEventListener("mouseleave", () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.2
        });
    });

});

// ========================================
// API / SERVER HANDLING
// ========================================

// Example backend URL
const API_URL = "http://localhost:3000";

// Fetch pickup games from backend
async function fetchGames() {

    try {

        const response = await fetch(`${API_URL}/games`);

        const games = await response.json();

        console.log("Games:", games);

        // Here later you can dynamically render cards

    } catch (error) {

        console.error("Failed to fetch games:", error);

    }

}

// Create a new game
async function createGame() {

    const newGame = {
        court: "Julia Davis Park",
        type: "5v5",
        level: "Competitive",
        time: "7:30 PM"
    };

    try {

        const response = await fetch(`${API_URL}/games`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newGame)
        });

        const data = await response.json();

        console.log("Game created:", data);

    } catch (error) {

        console.error("Error creating game:", error);

    }

}

// Join a game
async function joinGame(gameId) {

    try {

        const response = await fetch(`${API_URL}/games/${gameId}/join`, {
            method: "POST"
        });

        const data = await response.json();

        console.log("Joined game:", data);

    } catch (error) {

        console.error("Error joining game:", error);

    }

}

// Load games when app starts
fetchGames();