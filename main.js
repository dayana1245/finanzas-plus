class BudgetTracker {
    constructor() {
        this.transactions = [];
        this.form = document.getElementById("transactionForm");
        this.transactionList = document.getElementById("transactionList");
        this.balanceElement = document.getElementById("balance"); // Fixed: lowercase 'b'

        this.initEventListeners();
        this.renderTransactions();
        this.updateBalance();
    }

    initEventListeners() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            const description = document.getElementById("description").value;
            const amount = parseFloat(document.getElementById("amount").value);
            const type = document.getElementById("type").value;

            const newTransaction = {
                id: Date.now(),
                description,
                amount: type === "Gastos" ? -Math.abs(amount) : Math.abs(amount),
                type
            };

            this.transactions.push(newTransaction);
            this.renderTransactions();
            this.updateBalance();
            this.form.reset();
        });
    }

    renderTransactions() {
        this.transactionList.innerHTML = "";
        this.transactions
            .slice()
            .sort((a, b) => b.id - a.id)
            .forEach((transaction) => {
                const transactionDiv = document.createElement("div");
                transactionDiv.classList.add("transaction", transaction.type === "Ingresos" ? "income" : "expense");
                transactionDiv.innerHTML = `
                    <span>${transaction.description}</span>
                    <span>$${Math.abs(transaction.amount).toLocaleString("es-CO")}
                        <button class="delete-btn" data-id="${transaction.id}">🗑️</button>
                    </span>
                `;
                this.transactionList.appendChild(transactionDiv);
            });

        this.attachDeleteEventListeners();
    }

    attachDeleteEventListeners() {
        this.transactionList.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", () => {
                const id = Number(button.dataset.id);
                this.deleteTransaction(id);
            });
        });
    }

    deleteTransaction(id) {
        this.transactions = this.transactions.filter((t) => t.id !== id);
        this.renderTransactions();
        this.updateBalance();
    }

    updateBalance() {
        const total = this.transactions.reduce((sum, t) => sum + t.amount, 0);
        const formattedTotal = Math.abs(total).toLocaleString("es-CO"); // Fixed: toLocaleString
        const sign = total < 0 ? "-" : "";
        this.balanceElement.textContent = `Balance: ${sign}$${formattedTotal}`;
    }
}

// Inicializar la clase cuando se cargue la página
window.addEventListener("DOMContentLoaded", () => {
    new BudgetTracker();
});