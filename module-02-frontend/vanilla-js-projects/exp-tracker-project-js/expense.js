const expenseList = document.getElementById("expenseList");
const expenseForm = document.getElementById("expenseForm");

const expName = document.getElementById("expenseName");
const expAmount = document.getElementById("expenseAmount");
const expCategory = document.getElementById("expenseCategory");

const totalAmount = document.getElementById("totalAmount");
const filterCategory = document.getElementById("filterCategory");

let expenses = [];

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const val = expName.value.trim();
  const amountVal = Number(expAmount.value.trim());
  const categoryVal = expCategory.value;

  if (!val || amountVal <= 0) {
    console.log("Enter a valid expense and positive number");
    return;
  }

  const expObj = {
    id: Date.now(),
    name: val,
    amount: amountVal,
    category: categoryVal,
  };

  expenses.push(expObj);

  expName.value = "";
  expAmount.value = "";

  renderExpenses(expenses);
  saveExpenses();
});

function renderExpenses(data) {
  expenseList.innerHTML = "";

  data.forEach((obj) => {
    const li = document.createElement("li");

    li.innerText = `Name: ${obj.name}, Amount: Rs ${obj.amount}, Category: ${obj.category}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.dataset.id = obj.id;
    deleteBtn.classList.add("delete");

    li.append(deleteBtn);
    expenseList.append(li);
  });

  const total = data.reduce((acc, expObj) => {
    return acc + expObj.amount;
  }, 0);

  totalAmount.innerText = total;
}

expenseList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.classList.contains("delete")) {
    const id = Number(e.target.dataset.id);

    expenses = expenses.filter((obj) => {
      return obj.id !== id;
    });

    renderExpenses(expenses);
    saveExpenses();
  }
});

filterCategory.addEventListener("change", () => {
  const filterVal = filterCategory.value;

  if (filterVal === "All") {
    renderExpenses(expenses);
  } else {
    const result = expenses.filter((expObj) => {
      return expObj.category === filterVal;
    });

    renderExpenses(result);
  }
});

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadExpenses() {
  const stored = localStorage.getItem("expenses");

  if (stored) {
    expenses = JSON.parse(stored);
  }

  renderExpenses(expenses);
}

loadExpenses();