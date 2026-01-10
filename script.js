const API_URL = "/api/transactions";
const form = document.getElementById("transactionForm");
const yeetBtn = document.getElementById("yeetBtn");
const historyContainer = document.getElementById("historyContainer");
const emptyMsg = document.getElementById("emptyMsg");

let transactions = [];

// Initialize: Load data from Google Sheets
window.addEventListener("DOMContentLoaded", fetchTransactions);

async function fetchTransactions() {
    emptyMsg.innerText = "Loading transactions...";
    try {
        const response = await fetch(API_URL);
        transactions = await response.json();
        // Sort newest first based on the timestamp column (index 5)
        transactions.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        renderHistory();
    } catch (error) {
        console.error("Error fetching data:", error);
        emptyMsg.innerText = "Failed to load data.";
    }
}

form.addEventListener("input", () => {
    yeetBtn.disabled = !form.checkValidity();
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Disable UI during sync
    yeetBtn.disabled = true;
    yeetBtn.innerText = "YEETING...";

    const newEntry = {
        date: document.getElementById("date").value,
        amount: parseFloat(document.getElementById("amount").value).toFixed(2),
        description:
            document.getElementById("description").value || "No Description",
        sourceofpayment: document.getElementById("sourceOfPayment").value,
        category: document.getElementById("category").value,
    };

    console.log("🚀 Yeeting data:", newEntry);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(newEntry),
        });

        if (response.ok) {
            console.log("🚀 Data synced to Google Sheets!");
            // Refresh list from sheet to ensure sync
            await fetchTransactions();
            form.reset();
        }
    } catch (error) {
        alert("Yeet failed! Check your connection.");
        console.error(error);
    } finally {
        yeetBtn.innerText = "YEET!";
    }
});

function renderHistory() {
    if (transactions.length > 0) {
        emptyMsg.classList.add("hidden");
    } else {
        emptyMsg.classList.remove("hidden");
        emptyMsg.innerText = "No transactions yet. Yeet something!";
    }

    const groups = {};
    transactions.forEach((t) => {
        const dateObj = new Date(t.date);
        const monthYear = dateObj.toLocaleString("default", {
            month: "long",
            year: "numeric",
        });
        if (!groups[monthYear]) groups[monthYear] = [];
        groups[monthYear].push(t);
    });

    historyContainer.innerHTML = "";

    Object.keys(groups).forEach((month) => {
        const details = document.createElement("details");
        details.open = true;
        details.className = "group mb-4";

        const summary = document.createElement("summary");
        summary.className =
            "bg-gray-400 text-white p-3 rounded-lg cursor-pointer font-bold list-none flex justify-between items-center mb-2";
        summary.innerHTML = `${month} <span class="text-xs">▼</span>`;

        const listContainer = document.createElement("div");
        listContainer.className = "space-y-2";

        groups[month].forEach((t) => {
            const container = document.createElement("div");
            container.className = "swipe-container mb-2 shadow-sm";

            container.innerHTML = `
                <div class="action-buttons bg-transparent">
                    <button onclick="editTransaction('${
                        t.id
                    }')" class="p-3 bg-white rounded-xl shadow-sm hover:bg-gray-100">
                        <img src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png" width="20"/>
                    </button>
                    <button onclick="deleteTransaction('${
                        t.id
                    }')" class="p-3 bg-white rounded-xl shadow-sm hover:bg-gray-100">
                        <img src="https://img.icons8.com/material-outlined/24/000000/trash.png" width="20"/>
                    </button>
                </div>
    
                <div class="card-content bg-custom-card p-4 flex justify-between items-center" 
                     onmousedown="startSwipe(event)" ontouchstart="startSwipe(event)">
                    <div class="text-sm">
                        <p class="font-bold">${new Date(
                            t.date
                        ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}</p>
                        <p class="text-gray-600">${t.description}</p>
                        <p class="text-xs text-gray-500">${
                            t.sourceofpayment
                        } • ${t.category}</p>
                    </div>
                    <div class="text-2xl font-bold">$${parseFloat(
                        t.amount
                    ).toFixed(2)}</div>
                </div>
            `;
            listContainer.appendChild(container);
        });

        details.appendChild(summary);
        details.appendChild(listContainer);
        historyContainer.appendChild(details);
    });
}

let startX = 0;
let currentSwipedCard = null;

function startSwipe(e) {
    // Get start position (touch or mouse)
    startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    const card = e.currentTarget;

    // Reset previous card if swiping a new one
    if (currentSwipedCard && currentSwipedCard !== card) {
        currentSwipedCard.classList.remove("swiped-left");
    }

    const onMove = (moveEvent) => {
        const moveX =
            moveEvent.type === "touchmove"
                ? moveEvent.touches[0].clientX
                : moveEvent.clientX;
        const diff = startX - moveX;

        // If swiped left more than 50px, trigger the reveal
        if (diff > 50) {
            card.classList.add("swiped-left");
            currentSwipedCard = card;
        }
        // If swiped right, hide buttons
        else if (diff < -50) {
            card.classList.remove("swiped-left");
        }
    };

    const onEnd = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onEnd);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onEnd);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchmove", onMove);
    document.addEventListener("touchend", onEnd);
}

async function deleteTransaction(id) {
    if (
        !confirm("Are you sure you want to yeet this to the land of no return?")
    )
        return;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "delete", id: id }),
        });

        if (response.ok) {
            console.log("🚀 Row deleted from Sheets");
            await fetchTransactions(); // Refresh the list
        }
    } catch (error) {
        console.error("Delete failed:", error);
        alert("Could not delete. Check your connection.");
    }
}

function editTransaction(id) {
    const transaction = transactions.find((t) => t.id == id);
    if (!transaction) return;

    // 1. Set the hidden ID field
    document.getElementById("editId").value = id;

    // 2. Populate fields
    document.getElementById("date").value = transaction.date;
    document.getElementById("amount").value = transaction.amount;
    document.getElementById("description").value = transaction.description;
    document.getElementById("sourceOfPayment").value =
        transaction.sourceofpayment;
    document.getElementById("category").value = transaction.category;

    // 3. Change button text to show we are editing
    yeetBtn.disabled = false;
    yeetBtn.innerText = "UPDATE YEET";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// --- Update the Submit Listener ---
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const editId = document.getElementById("editId").value;

    yeetBtn.disabled = true;
    yeetBtn.innerText = editId ? "UPDATING..." : "YEETING...";

    const newEntry = {
        action: editId ? "edit" : "create", // Tell Apps Script what to do
        id: editId || new Date().getTime().toString(), // Use existing ID or new one
        date: document.getElementById("date").value,
        amount: parseFloat(document.getElementById("amount").value).toFixed(2),
        description:
            document.getElementById("description").value || "No Description",
        sourceofpayment: document.getElementById("sourceOfPayment").value,
        category: document.getElementById("category").value,
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEntry),
        });

        if (response.ok) {
            form.reset();
            document.getElementById("editId").value = ""; // Clear edit mode
            await fetchTransactions();
        }
    } catch (error) {
        console.error(error);
        alert("Action failed!");
    } finally {
        yeetBtn.innerText = "YEET!";
        yeetBtn.disabled = true;
    }
});
