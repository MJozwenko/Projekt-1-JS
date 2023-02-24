let wallet = 0;
let incomes = 0;
let expenses = 0;

document.addEventListener("DOMContentLoaded", (e) => {
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

  incomeBalance.innerHTML = `Suma przychodów:   ${incomes.toFixed(2)}   zł`;
  expenseBalance.innerHTML = `Suma wydatków:   ${expenses.toFixed(2)}   zł`;
  balance.innerHTML = "Bilans wynosi zero";

  function totalBalance() {
    wallet = (incomes - expenses).toFixed(2);
    if (wallet < 0) {
      balance.innerHTML = `Bilans jest ujemny. Jesteś na minusie   ${
        wallet * -1
      }   złotych`;
    } else if (wallet > 0) {
      balance.innerHTML = `Możesz jeszcze wydać   ${wallet}   złotych`;
    } else {
      balance.innerHTML = "Bilans wynosi zero";
    }
  }

  //Przychody

  const inputIncomeName = (e) => {
    const inputName = document.createElement("input");
    inputName.setAttribute("id", "editInputNameIncome");
    return inputName;
  };

  const inputValueIncome = (e) => {
    const inputValue = document.createElement("input");
    inputValue.setAttribute("id", "editInputValueIncome");
    inputValue.setAttribute("type", "number");
    inputValue.setAttribute("min", "1");
    inputValue.setAttribute("step", ".01");
    inputValue.setAttribute("oninput", "validity.valid||(value='');");
    return inputValue;
  };

  const editIncomeButtons = (e) => {
    const btnSaveIncome = document.createElement("button");
    btnSaveIncome.classList = "btnSave";
    btnSaveIncome.innerHTML = '<i class="fa-solid fa-check"></i>';
    const btnCancelIncome = document.createElement("button");
    btnCancelIncome.classList = "btnCancel";
    btnCancelIncome.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    return [btnSaveIncome, btnCancelIncome];
  };

  const handleBtnEditIncome = (e) => {
    const incomesListPoint = e.target.parentElement;
    incomesListPoint.innerHTML = "";

    const inputName = inputIncomeName();
    const inputValue = inputValueIncome();
    const [btnSaveIncome, btnCancelIncome] = editIncomeButtons();

    inputName.value = incomesListPoint.dataset.name;
    inputValue.value = incomesListPoint.dataset.amount;
    incomesListPoint.appendChild(inputName);
    incomesListPoint.appendChild(inputValue);
    incomesListPoint.appendChild(btnSaveIncome);
    incomesListPoint.appendChild(btnCancelIncome);

    const handleBtnSaveIncome = (e) => {
      if (inputValue.value === "") {
        alert("Wypełnij wszystkie pola");
        document.getElementById("editInputValueIncome").focus();
        return;
      } else if (inputName.value === "") {
        alert("Wypełnij wszystkie pola");
        document.getElementById("editInputNameIncome").focus();
        return;
      }
      incomesListPoint.innerText = `${inputName.value}: ${inputValue.value} zł`;
      addButtons(incomesListPoint);
      incomes -= incomesListPoint.dataset.amount - inputValue.value;
      incomeBalance.innerHTML = `Suma przychodów:   ${incomes.toFixed(2)}   zł`;
      totalBalance();
      incomesListPoint.dataset.name = inputName.value;
      incomesListPoint.dataset.amount = inputValue.value;
    };

    const handleBtnCancelIncome = (e) => {
      incomesListPoint.innerText = `${incomesListPoint.dataset.name}: ${incomesListPoint.dataset.amount} zł`;
      addButtons(incomesListPoint);
    };

    btnSaveIncome.addEventListener("click", handleBtnSaveIncome);
    btnCancelIncome.addEventListener("click", handleBtnCancelIncome);
  };

  const handleBtnRemoveIncome = (e) => {
    const incomesListPoint = e.target.parentElement;
    incomes -= incomesListPoint.dataset.amount;
    incomeBalance.innerHTML = `Suma przychodów:   ${incomes.toFixed(2)}   zł`;
    totalBalance();
    incomesListPoint.remove();
  };

  const addListElement = (parentList, income) => {
    const incomesListPoint = document.createElement("li");
    incomesListPoint.innerText = `${income.title}: ${income.incomeValue} zł`;
    incomesListPoint.dataset.name = income.title;
    incomesListPoint.dataset.amount = income.incomeValue;
    parentList.appendChild(incomesListPoint);
    return incomesListPoint;
  };

  const addButtons = (listElement) => {
    const btnRemove = document.createElement("button");
    btnRemove.id = "btnRemoveIncome";
    btnRemove.innerText = "Usuń";
    btnRemove.addEventListener("click", handleBtnRemoveIncome);
    const btnEdit = document.createElement("button");
    btnEdit.id = "btnEditIncome";
    btnEdit.innerText = "Edytuj";
    btnEdit.addEventListener("click", handleBtnEditIncome);
    listElement.appendChild(btnRemove);
    listElement.appendChild(btnEdit);

    return listElement;
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    const income = {
      title: inputIncome.value,
      incomeValue: inputIncomeValue.value,
    };

    addListElement(incomesList, income);
    addButtons(incomesList.lastElementChild);

    inputIncome.value = "";
    inputIncomeValue.value = "";

    incomes += parseFloat(income.incomeValue);
    incomeBalance.innerHTML = `Suma przychodów:   ${incomes.toFixed(2)}   zł`;
    totalBalance();
  };

  incomeMain.addEventListener("submit", handleIncomeSubmit);

  //Wydatki
  const inputExpenseName = (e) => {
    const inputNameExpense = document.createElement("input");
    inputNameExpense.setAttribute("id", "editInputNameExpense");
    return inputNameExpense;
  };

  const inputExpenseValue = (e) => {
    const inputValueExpense = document.createElement("input");
    inputValueExpense.setAttribute("id", "editInputValueExpense");
    inputValueExpense.setAttribute("type", "number");
    inputValueExpense.setAttribute("min", "1");
    inputValueExpense.setAttribute("step", ".01");
    inputValueExpense.setAttribute("oninput", "validity.valid||(value='');");
    return inputValueExpense;
  };

  const editExpenseButtons = (e) => {
    const btnSaveExpense = document.createElement("button");
    btnSaveExpense.classList = "btnSaveExpense";
    btnSaveExpense.innerHTML = '<i class="fa-solid fa-check"></i>';
    const btnCancelExpense = document.createElement("button");
    btnCancelExpense.classList = "btnCancelExpense";
    btnCancelExpense.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    return [btnSaveExpense, btnCancelExpense];
  };

  const handleBtnEditExpense = (e) => {
    const expensesListPoint = e.target.parentElement;
    expensesListPoint.innerHTML = "";

    const inputNameExpense = inputExpenseName();
    const inputValueExpense = inputExpenseValue();
    const [btnSaveExpense, btnCancelExpense] = editExpenseButtons();

    inputNameExpense.value = expensesListPoint.dataset.name;
    inputValueExpense.value = expensesListPoint.dataset.amount;
    expensesListPoint.appendChild(inputNameExpense);
    expensesListPoint.appendChild(inputValueExpense);
    expensesListPoint.appendChild(btnSaveExpense);
    expensesListPoint.appendChild(btnCancelExpense);

    const handleBtnSaveExpense = (e) => {
      if (inputValueExpense.value === "") {
        alert("Wypełnij wszystkie pola");
        document.getElementById("editInputValueExpense").focus();
        return;
      } else if (inputNameExpense.value === "") {
        alert("Wypełnij wszystkie pola");
        document.getElementById("editInputNameExpense").focus();
        return;
      }
      expensesListPoint.innerText = `${inputNameExpense.value}: ${inputValueExpense.value} zł`;
      addButtonsExpense(expensesListPoint);
      expenses -= expensesListPoint.dataset.amount - inputValueExpense.value;
      expenseBalance.innerHTML = `Suma wydatków:   ${expenses.toFixed(2)}   zł`;
      totalBalance();
      expensesListPoint.dataset.name = inputNameExpense.value;
      expensesListPoint.dataset.amount = inputValueExpense.value;
    };

    const handleBtnCancelExpense = (e) => {
      expensesListPoint.innerText = `${expensesListPoint.dataset.name}: ${expensesListPoint.dataset.amount} zł`;
      addButtons(expensesListPoint);
    };

    btnSaveExpense.addEventListener("click", handleBtnSaveExpense);
    btnCancelExpense.addEventListener("click", handleBtnCancelExpense);
  };

  const handleBtnRemoveExpense = (e) => {
    console.log(expenses);
    const expensesListPoint = e.target.parentElement;

    expenses -= parseFloat(expensesListPoint.dataset.amount);
    expenseBalance.innerHTML = `Suma wydatków:   ${expenses.toFixed(2)}   zł`;
    expensesListPoint.remove();
    if (expenses <= 0) {
      return (expenseBalance.innerHTML = `Suma wydatków:   0.00   zł`);
    }
    totalBalance();
  };

  const addListElementExpense = (parentList, expense) => {
    const expensesListPoint = document.createElement("li");
    expensesListPoint.innerText = `${expense.title}: ${expense.expenseValue} zł`;
    expensesListPoint.dataset.name = expense.title;
    expensesListPoint.dataset.amount = expense.expenseValue;
    parentList.appendChild(expensesListPoint);
    return expensesListPoint;
  };

  const addButtonsExpense = (listElement) => {
    const btnRemoveExpense = document.createElement("button");
    btnRemoveExpense.innerText = "Usuń";
    btnRemoveExpense.id = "btnRemoveExpense";
    btnRemoveExpense.addEventListener("click", handleBtnRemoveExpense);
    const btnEdit = document.createElement("button");
    btnEdit.innerText = "Edytuj";
    btnEdit.id = "btnEditExpense";
    btnEdit.addEventListener("click", handleBtnEditExpense);
    listElement.appendChild(btnRemoveExpense);
    listElement.appendChild(btnEdit);
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();

    const expense = {
      title: inputExpenses.value,
      expenseValue: inputExpensesValue.value,
    };

    addListElementExpense(expensesList, expense);
    addButtonsExpense(expensesList.lastElementChild);

    inputExpenses.value = "";
    inputExpensesValue.value = "";

    expenses += parseFloat(expense.expenseValue);
    expenseBalance.innerHTML = `Suma wydatków:   ${expenses.toFixed(2)}   zł`;
    totalBalance();
  };

  expenseMain.addEventListener("submit", handleExpenseSubmit);
});
