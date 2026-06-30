//----------------username logic---------------//
let username = localStorage.getItem("username");

if (!username) {

    username = prompt("Enter your user name");

    if (!username || username.trim() === "") {
        username = "Anonymous Hooper";
    }

    localStorage.setItem("username", username);

}

document.addEventListener("DOMContentLoaded", () => {

    const userDisplay =
        document.querySelector("#current-user");

    if (userDisplay) {
        userDisplay.textContent = username;
    }

    const changeBtn =
        document.querySelector("#change-user-btn");

    if (changeBtn) {

        changeBtn.addEventListener("click", () => {

            const newUsername =
                prompt("Enter new username");

            if (!newUsername ||
                newUsername.trim() === "") {
                return;
            }

            localStorage.setItem(
                "username",
                newUsername
            );

            location.reload();

        });

    }

});

//----------------username logic--------------//

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
const API_URL = "";

// Fetch pickup games from backend
async function fetchGames() {

    try {

        const response = await fetch(`${API_URL}/games`);

        const games = await response.json();

        renderGames(games);
        console.log("Games:", games);

        // Here later you can dynamically render cards

    } catch (error) {

        console.error("Failed to fetch games:", error);

    }

}

// ========================================
// RENDER GAMES
// ========================================

function renderGames(games) {
    const container = document.querySelector(".games-container");

    container.innerHTML = "";

    games.forEach(game => {

        const hasJoined = game.joinedPlayers.includes(username);
        const isHost =
            game.host === username;
        const card = document.createElement("div");

        card.classList.add("game-card");

        card.dataset.id = game._id;

        /*card.innerHTML = `
    <div class="court-name">${game.court}</div>

    <div class="details">
        Hosted by ${game.host}
    </div>

    <div class="details">
        ${game.type} • ${game.level}
    </div>

    <div class="player-count">
        ${game.players}/${game.maxPlayers} Players
    </div>
    <div class="joined-players">
    Joined:
        ${game.joinedPlayers.join(", ")}
    </div>

    <div class="details">
        ${game.time}
    </div>
    ${isHost ? `
    <div class="host-badge">
        Hosting
    </div>
` :
                hasJoined ? `
    <button class="leave-btn">
        Leave Run
    </button>
` : `
    <button class="join-btn">
        Join Run
    </button>
`}


    ${game.host === username ? `
        <button class="delete-btn">
            Delete Run
        </button>
    ` : ""}
    ${game.host === username ? `
    <button class="edit-btn">
        Edit Run
    </button>
` : ""}
`;*/
card.innerHTML = `
<div class="card-header">
    <div>
        <div class="court-name">🏀 ${game.court}</div>
        <div class="location">
            📍 ${game.location.city}, ${game.location.state}
        </div>
    </div>

    <span class="level-badge ${game.level.toLowerCase()}">
        ${game.level}
    </span>
</div>

<div class="host">
    👤 Hosted by <strong>${game.host}</strong>
</div>

<div class="time">
    🕒 ${game.time}
</div>

<div class="player-count">
    👥 ${game.players}/${game.maxPlayers} Players
</div>

<div class="progress-bar">
    <div
        class="progress-fill"
        style="width:${(game.players/game.maxPlayers)*100}%">
    </div>
</div>

<div class="joined-players">
    <strong>Joined:</strong><br>
    ${game.joinedPlayers.join(" • ")}
</div>

<div class="button-row">

${
hasJoined
?
`
<button class="leave-btn">
Leave Run
</button>
`
:
`
<button class="join-btn">
Join Run
</button>
`
}

${
game.host===username
?
`
<button class="edit-btn">
✏ Edit
</button>

<button class="delete-btn">
🗑 Delete
</button>
`
:
""
}

</div>
`;


        const joinBtn =
            card.querySelector(".join-btn");

        if (joinBtn) {

            joinBtn.addEventListener("click", () => {
                joinGame(game._id);
            });

        }

        const leaveBtn =
            card.querySelector(".leave-btn");

        if (leaveBtn) {

            leaveBtn.addEventListener("click", () => {
                leaveGame(game._id);
            });

        }

        const deleteBtn =
            card.querySelector(".delete-btn");

        if (deleteBtn) {

            deleteBtn.addEventListener("click", () => {
                deleteGame(game._id);
            });

        }
        const editBtn =
            card.querySelector(".edit-btn");

        if (editBtn) {

            editBtn.addEventListener("click", () => {
                editGame(game);
            });

        }

        container.appendChild(card);
    });

    gsap.from(".game-card", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        delay: 1.3
    });
}

// Create a new game
async function createGame() {

    const newGame = {
        court: document.querySelector("#court").value,

        type: document.querySelector("#type").value,

        level: document.querySelector("#level").value,

        time: document.querySelector("#time").value,

        players: 1,

        maxPlayers: Number(
            document.querySelector("#maxPlayers").value
        ),

        host: username,
        joinedPlayers: [username],
        location: {
            city: document.querySelector("#city").value,
            state: document.querySelector("#state").value
        }
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

        fetchGames();

        // Clear inputs
        document.querySelector("#court").value = "";
        document.querySelector("#type").value = "";
        document.querySelector("#level").value = "";
        document.querySelector("#time").value = "";
        document.querySelector("#maxPlayers").value = "";
        document.querySelector("#city").value = "";
        document.querySelector("#state").value = "";

    } catch (error) {

        console.error("Error creating game:", error);

    }

}



// Join a game
async function joinGame(gameId) {

    try {

        const response = await fetch(`${API_URL}/games/${gameId}/join`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username
            })
        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.error);

            return;
        }

        const card = document.querySelector(
            `[data-id="${data._id}"]`
        );

        if (!card) return;

        const playerCount = card.querySelector(".player-count");

        playerCount.textContent =
            `${data.players}/${data.maxPlayers} Players`;

        // Small feedback animation
        gsap.fromTo(playerCount,
            {
                scale: 1.3
            },
            {
                scale: 1,
                duration: 0.3
            }
        );
        console.log("Joined game:", data);

        fetchGames();

    } catch (error) {

        console.error("Error joining game:", error);

    }

}

async function leaveGame(gameId) {

    try {

        const response = await fetch(
            `${API_URL}/games/${gameId}/leave`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.error);
            return;

        }

        console.log("Left game:", data);

        fetchGames();

    } catch (error) {

        console.error("Error leaving game:", error);

    }

}

async function deleteGame(gameId) {

    if (
        !confirm(
            "Are you sure you want to delete this run?"
        )
    ) {
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/games/${gameId}`,
            {
                method: "DELETE",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username
                })
            }
        );

        const data = await response.json();

        console.log(data);

        fetchGames();

    } catch (error) {

        console.error(
            "Error deleting game:",
            error
        );

    }

}

async function editGame(game) {

    const newCourt =
        prompt("Court:", game.court);

    if (!newCourt) return;

    const newType =
        prompt("Game Type", game.type);

    if (!newType) return;

    const newTime =
        prompt("New time:", game.time);

    if (!newTime) return;

    const newLevel =
        prompt("New level:", game.level);

    if (!newLevel) return;
    
    try {

        const response = await fetch(
            `${API_URL}/games/${game._id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    username,

                    updates: {

                        time: newTime,
                        level: newLevel,
                        type: newType,
                        court: newCourt

                    }

                })

            }
        );

        const updatedGame =
            await response.json();

        console.log(
            "Updated:",
            updatedGame
        );

        fetchGames();

    } catch (error) {

        console.error(error);

    }

}

document.querySelector("#create-btn")
    .addEventListener("click", createGame);

// Load games when app starts
fetchGames();