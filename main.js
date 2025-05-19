class BudgetTracker {
    constructor() {
        this.transactions = [];
        this.form = document.getElementById("transactionForm");
        this.transactionList = document.getElementById("transactionList");
        this.BalanceElement = document.getElementById("Balance");

        this.initEventListeners();
        this.loadTransactions(); // 👈 carga desde PHP
    }

    initEventListeners() {
        this.form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const description = document.getElementById("description").value;
            const amount = parseFloat(document.getElementById("amount").value);
            const type = document.getElementById("type").value;

            const data = new URLSearchParams();
            data.append("descripcion", description);
            data.append("monto", amount);
            data.append("tipo", type);

            const response = await fetch("guardar_transaccion.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data
            });

            const result = await response.json();
            if (result.success) {
                this.loadTransactions(); // 👈 recargar desde BD
                this.form.reset();
            } else {
                alert("Error al guardar: " + result.error);
            }
        });
    }

    async loadTransactions() {
        const response = await fetch("obtener_transacciones.php");
        const data = await response.json();

        if (data.success) {
            this.transactions = data.data.map(t => ({
                id: t.id,
                description: t.descripcion,
                amount: t.tipo === "Gastos" ? -Math.abs(parseFloat(t.monto)) : parseFloat(t.monto),
                type: t.tipo
            }));
            this.renderTransactions();
            this.updateBalance();
        } else {
            alert("Error al cargar transacciones: " + data.error);
        }
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

    async deleteTransaction(id) {
        const response = await fetch("eliminar_transaccion.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `id=${id}`
        });

        const result = await response.json();
        if (result.success) {
            this.loadTransactions(); // recargar
        } else {
            alert("Error al eliminar: " + result.error);
        }
    }

    updateBalance() {
        const total = this.transactions.reduce((sum, t) => sum + t.amount, 0);
        this.BalanceElement.textContent = `Balance: $${total.toLocaleString("es-CO")}`;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    new BudgetTracker();
});
