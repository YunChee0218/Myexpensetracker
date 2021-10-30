const addExpenseBtn = document.querySelector('#addExpenseBtn');
const addIncomeBtn = document.querySelector('#addIncomeBtn');
const expenseTable = document.querySelector('#tableExpense');
const savedExpenses = JSON.parse(localStorage.getItem('expenses'));
const nameInput = document.querySelector('#expense-input');
const amountInput = document.querySelector('#expense-amount');
const dateInput = document.querySelector('#expense-date');
const balanceEl = document.querySelector('#balance');
const incomeEl = document.querySelector('#income');
const expenseEl = document.querySelector('#expense');


addExpenseBtn.addEventListener('click', addExpense);
addIncomeBtn.addEventListener('click', addIncome);

/*(Array.isArray(savedExpenses)){
    expenses = savedExpenses
}else{
    expenses = [];
}*/

function start(){
    const saveInfo = JSON.parse(localStorage.getItem('expenseTrackerInfo'));

    if (saveInfo){
        info = saveInfo;
    }else{
        info = {
            balance: 0,
            income: 0,
            expense: 0,
            cashflow: []
    }};

    updateInfo();


}

/*let info = {
    balance: 0,
    income: 0,
    expense: 0,
    cashflow: []
}*/



/*function storeMemory(){
    localStorage.setItem('expenses', JSON.stringify(expenses));
}*/




function addIncome(){
    addTransaction(nameInput.value, dateInput.value, amountInput.value, 'income')
}

function addExpense(){
    addTransaction(nameInput.value, dateInput.value, amountInput.value, 'expense')
}


function addTransaction(name, date, amount, type){
    if(name && date && amount){
        const id = '' + new Date().getTime();
        let transaction =
            {id: id,
            name: name,
            date: date,
            amount: parseInt(amount),
            type: type}
        
        info.cashflow.push(transaction)
    }else{
        alert('Please fill in all data')
    }

    nameInput.value = '';
    dateInput.value = '';
    amountInput.value = '';




    //storeMemory();
    updateInfo();
}

function removeExpense(event){
    const deleteBtn = event.target;
    const toDeleteId = deleteBtn.id;
    let deleteIndex;
    
    for(let i = 0; i < info.cashflow.length; i++){
        if(info.cashflow[i].id === toDeleteId){
            deleteIndex = i;
            break;
        }
    }

    info.cashflow.splice(deleteIndex, 1);
    

    //storeMemory();
    updateInfo();
}

function updateInfo(){
    let balance = 0;
    let income = 0;
    let expense = 0;

    for(let i=0; i < info.cashflow.length ;i++){
        let item = info.cashflow[i];
        if(item.type === 'income'){
            income += item.amount;
        }else if(item.type === 'expense'){
            expense += item.amount;
        }
    }

    balance = income - expense;

    info.balance = balance;
    info.income = income;
    info.expense = expense;

    localStorage.setItem('expenseTrackerInfo', JSON.stringify(info));

    render();

}

function render(){
    balanceEl.innerHTML = `RM ${info.balance}`;
    incomeEl.innerHTML = `RM ${info.income}`;
    expenseEl.innerHTML = `RM ${info.expense}`;

    expenseTable.innerHTML = ''

    const table = document.getElementById('tableExpense');
    const header = table.createTHead();
    const row = header.insertRow(0);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);

    cell1.innerHTML = '<b>Name</b>';
    cell2.innerHTML = '<b>Date</b>';
    cell3.innerHTML = '<b>Amount</b>';
    cell4.innerHTML = '';

    for(let i=0; i<info.cashflow.length; i++){
        item = info.cashflow[i];

        let element = document.createElement('tr');
        if(item.type === 'income'){
            element.classList.add('in');
        }else if(item.type === 'expense'){
            element.classList.add('out');
        }

        let expenseName = document.createElement('td');
        expenseName.append(item.name);
        element.appendChild(expenseName);

        let expenseDate = document.createElement('td');
        expenseDate.append(item.date);
        element.appendChild(expenseDate);

        let expenseAmount = document.createElement('td');
        expenseAmount.append(item.amount);
        expenseAmount.innerText = `RM ${item.amount}`

        element.appendChild(expenseAmount);

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'x'
        deleteBtn.className = 'removeBtn';
        deleteBtn.id = item.id;
        deleteBtn.onclick = removeExpense;

        let deleteExpense = document.createElement('td');
        deleteExpense.append(deleteBtn);

        element.appendChild(deleteExpense);
        

        expenseTable.appendChild(element);
    }

    /*info.cashflow.forEach(transaction=>{
  
        let element = document.createElement('tr');
            

        let expenseName = document.createElement('td');
        expenseName.append(transaction[i].name);
        element.appendChild(expenseName);

        let expenseDate = document.createElement('td');
        expenseDate.append(transaction[i].date);
        element.appendChild(expenseDate);

        let expenseAmount = document.createElement('td');
        expenseAmount.append(transaction[i].amount);
        expenseAmount.innerText = `$ ${transaction.amount}`
        element.appendChild(expenseAmount);

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'X'
        deleteBtn.className = 'removeBtn';
        deleteBtn.id = transaction.id;
        deleteBtn.onclick = removeExpense;

        let deleteExpense = document.createElement('td');
        deleteExpense.append(deleteBtn);

        element.appendChild(deleteExpense);
        

        expenseTable.appendChild(element);

    })*/


}

start();
