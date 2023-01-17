let wallet = 0;
let incomes = 0;
let expenses = 0;

const incomeMain = document.getElementById("incomeMain");
const expenseMain = document.getElementById("expenseMain");
const inputIncome = document.getElementById("inputIncome");
const inputIncomeValue = document.getElementById("inputIncomeValue");
const inputExpenses = document.getElementById("inputExpenses");
const inputExpensesValue = document.getElementById("inputExpensesValue");
const balance = document.getElementById("balance");
const incomesList = document.getElementById("incomesList");
const incomeBalance = document.getElementById("incomes");
const expensesList = document.getElementById("expensesList");
const expenseBalance = document.getElementById("expenses");

incomeBalance.innerHTML = "Suma przychodów: " + incomes + " zł";
expenseBalance.innerHTML = "Suma wydatków: " + expenses + " zł";
balance.innerHTML = "Bilans wynosi zero";

function totalBalance() {
  wallet = incomes - expenses;
  if (wallet < 0) {
    balance.innerHTML =
      "Bilans jest ujemny. Jesteś na minusie " + wallet * -1 + " złotych";
  } else if (wallet > 0) {
    balance.innerHTML = "Możesz jeszcze wydać " + wallet + " złotych";
  } else {
    balance.innerHTML = "Bilans wynosi zero";
  }
}

//Przychody

incomeMain.addEventListener("submit", (e) => {
  e.preventDefault();

  let income = {
    title: inputIncome.value,
    incomeValue: inputIncomeValue.value,
  };

  let incomesListPoint = document.createElement("li");
  incomesListPoint.innerText = `${income.title}: ${income.incomeValue} zł`;
  incomesListPoint.dataset.name = income.title;
  incomesListPoint.dataset.amount = income.incomeValue;
  incomesList.appendChild(incomesListPoint);

  const btnRemoveIncome = document.createElement("button");
  btnRemoveIncome.id = "btnRemoveIncome";
  btnRemoveIncome.innerText = "Usuń";
  incomesListPoint.appendChild(btnRemoveIncome);

  const btnEditIncome = document.createElement("button");
  btnEditIncome.innerText = "Edytuj";
  btnEditIncome.id = "btnEditIncome";
  incomesListPoint.appendChild(btnEditIncome);

  inputIncome.value = "";
  inputIncomeValue.value = "";

  function deleteElement() {
    let close = document.getElementsByTagName("li");
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let elementToBeDeleted = this.parentElement;
        elementToBeDeleted.remove();
      };
    }
  }

  btnEditIncome.addEventListener("click", (e) => {
    incomesListPoint.innerHTML = "";
    const inputName = document.createElement("input");
    inputName.setAttribute("id", "editInputNameIncome");
    const inputValue = document.createElement("input");
    inputValue.setAttribute("id", "editInputValueIncome");
    inputValue.setAttribute("type", "number");
    inputValue.setAttribute("min", "0");
    const btnSaveIncome = document.createElement("button");
    btnSaveIncome.classList = "btnSave";
    btnSaveIncome.innerHTML = '<i class="fa-solid fa-check"></i>';
    const btnCancelIncome = document.createElement("button");
    btnCancelIncome.classList = "btnCancel";
    btnCancelIncome.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    inputName.value = incomesListPoint.dataset.name;
    inputValue.value = incomesListPoint.dataset.amount;
    incomesListPoint.appendChild(inputName);
    incomesListPoint.appendChild(inputValue);
    incomesListPoint.appendChild(btnSaveIncome);
    incomesListPoint.appendChild(btnCancelIncome);

    btnSaveIncome.addEventListener("click", (e) => {
      incomesListPoint.innerText = `${inputName.value}: ${inputValue.value} zł`;
      incomesListPoint.appendChild(btnRemoveIncome);
      incomesListPoint.appendChild(btnEditIncome);
      incomes -= incomesListPoint.dataset.amount - inputValue.value;
      incomeBalance.innerHTML = "Suma przychodów: " + incomes + " zł";
      totalBalance();
      incomesListPoint.dataset.name = inputName.value;
      incomesListPoint.dataset.amount = inputValue.value;
    });

    btnCancelIncome.addEventListener("click", (e) => {
      incomesListPoint.innerText = `${income.title} - ${income.incomeValue} zł`;
      incomesListPoint.appendChild(btnRemoveIncome);
      incomesListPoint.appendChild(btnEditIncome);
    });
  });

  btnRemoveIncome.addEventListener("click", (e) => {
    deleteElement();
    incomes -= parseFloat(incomesListPoint.dataset.amount);
    incomeBalance.innerHTML = "Suma przychodów: " + incomes + " zł";
    totalBalance();
    incomesListPoint.remove();
  });

  incomes += parseFloat(income.incomeValue);
  incomeBalance.innerHTML = "Suma przychodów: " + incomes + " zł";
  totalBalance();
});

//Wydatki

expenseMain.addEventListener("submit", (e) => {
  e.preventDefault();

  let expense = {
    title: inputExpenses.value,
    expenseValue: inputExpensesValue.value,
  };

  let expensesListPoint = document.createElement("li");
  expensesListPoint.innerText = `${expense.title}: ${expense.expenseValue} zł`;
  expensesListPoint.dataset.name = expense.title;
  expensesListPoint.dataset.amount = expense.expenseValue;
  expensesList.appendChild(expensesListPoint);

  const btnRemoveExpense = document.createElement("button");
  btnRemoveExpense.innerText = "Usuń";
  btnRemoveExpense.id = "btnRemoveExpense";
  expensesListPoint.appendChild(btnRemoveExpense);

  const btnEdit = document.createElement("button");
  btnEdit.innerText = "Edytuj";
  btnEdit.id = "btnEditExpense";
  expensesListPoint.appendChild(btnEdit);

  inputExpenses.value = "";
  inputExpensesValue.value = "";

  function deleteElement() {
    let close = document.getElementsByTagName("li");
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let elementToBeDeleted = this.parentElement;
        elementToBeDeleted.remove();
      };
    }
  }

  btnEdit.addEventListener("click", (e) => {
    expensesListPoint.innerHTML = "";
    const inputNameExpense = document.createElement("input");
    inputNameExpense.setAttribute("id", "editInputNameExpense");
    const inputValueExpense = document.createElement("input");
    inputValueExpense.setAttribute("id", "editInputValueExpense");
    inputValueExpense.setAttribute("type", "number");
    inputValueExpense.setAttribute("min", "0");
    const btnSaveExpense = document.createElement("button");
    btnSaveExpense.classList = "btnSaveExpense";
    btnSaveExpense.innerHTML = '<i class="fa-solid fa-check"></i>';
    const btnCancelExpense = document.createElement("button");
    btnCancelExpense.classList = "btnCancelExpense";
    btnCancelExpense.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    inputNameExpense.value = expensesListPoint.dataset.name;
    inputValueExpense.value = expensesListPoint.dataset.amount;
    expensesListPoint.appendChild(inputNameExpense);
    expensesListPoint.appendChild(inputValueExpense);
    expensesListPoint.appendChild(btnSaveExpense);
    expensesListPoint.appendChild(btnCancelExpense);

    btnSaveExpense.addEventListener("click", (e) => {
      expensesListPoint.innerText = `${inputNameExpense.value}: ${inputValueExpense.value} zł`;
      expensesListPoint.appendChild(btnRemoveExpense);
      expensesListPoint.appendChild(btnEdit);
      expenses -= expensesListPoint.dataset.amount - inputValueExpense.value;
      expenseBalance.innerHTML = "Suma przychodów: " + expenses + " zł";
      totalBalance();
      expensesListPoint.dataset.name = inputNameExpense.value;
      expensesListPoint.dataset.amount = inputValueExpense.value;
    });

    btnCancelExpense.addEventListener("click", (e) => {
      expensesListPoint.innerText = `${expense.title}: ${expense.expenseValue} zł`;
      expensesListPoint.appendChild(btnRemoveExpense);
      expensesListPoint.appendChild(btnEdit);
    });
  });

  btnRemoveExpense.addEventListener("click", (e) => {
    deleteElement();
    expenses -= parseFloat(expensesListPoint.dataset.amount);
    expenseBalance.innerHTML = "Suma wydatków: " + expenses + " zł";
    totalBalance();
    expensesListPoint.remove();
  });

  expenses += parseFloat(expense.expenseValue);
  expenseBalance.innerHTML = "Suma wydatków: " + expenses + " zł";
  totalBalance();
});
