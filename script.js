'use strict';

//            Bankist App             //

//               Data

const accaunt1 = {
    owner: 'Imomali Fayzullayev',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111,
};


const accaunt2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, 3210, 1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const accaunt3 = {
    owner: 'Steven Thomas William',
    movements: [200, -200, 340, -20, 50, 400, -460],
    interestRate: 1,
    pin: 4444,
};

const accaunt4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 3333,
};

const accaunt5 = {
    owner: 'Jones Schmadtmenn',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 5555,
};

const accaunts = [accaunt1, accaunt2, accaunt3, accaunt4, accaunt5];



//                  Elements          //
const labelWelcome = document.querySelector('.welcome');
const labelData = document.querySelector('.date');
const labeleBalance = document.querySelector('.balance__value');
const labalSumIn = document.querySelector('.summary__value--in');
const labelSumOut  = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summay__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


//                         gooo               //

const displayMovements  = function (movements, sort = false) {
    containerMovements.innerHTML = '';

    const movements_sort = sort ? movements.slice().sort((a, b)=> a - b) : movements;

    movements_sort?.forEach((mov, index)=> {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
            <div class="movements__row">
                <div class="movements__type movements__type--${type}">${type}</div>
                <div class="movements__value">${mov} UZS</div>
            </div>
        `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
}


const calcDisplayBalance = function (accaunt) {
    accaunt.balance = accaunt?.movements.reduce((accum, current)=> {
        return accum + current;
    },0);
    labeleBalance.textContent = `${accaunt.balance} UZS`;
}


const calcDisplaySummary = function (accaunt) {
    const incomes = accaunt.movements
        .filter((mov)=> mov > 0)
        .reduce((accum, mov)=> accum + mov, 0 );
    labalSumIn.textContent = `${incomes} UZS`;

    const outgoing = accaunt.movements
        .filter((mov)=> mov < 0)
        .reduce((accum, mov)=> accum + mov, 0);
    labelSumOut.textContent = `${Math.abs(outgoing)} UZS`;   
    
    const interest = accaunt.movements
        .filter((mov)=> mov > 0)
        .map((deposit) => (deposit * accaunt.interestRate) / 100)
        .filter((int, i, arr) => {
            return int >= 1;
        })
        .reduce((accum, interest)=> accum + interest, 0)
    labelSumInterest.textContent = `${interest} UZS`;      
}


const createUserName = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map((name) => name[0]).join('');
    });
    console.log(accaunts);
};

createUserName(accaunts);


const updateUI = function (acc) {
     // Display movements
    displayMovements(acc?.movements); 
    // Display balance
    calcDisplayBalance(acc);
    // Display summary
    calcDisplaySummary(acc);   
}

//Event handler
let currentAccaunt;

btnLogin.addEventListener('click', (e)=> {
    //Prevent form from submitting
    e.preventDefault();
    currentAccaunt = accaunts.find((acc)=> acc.username === inputLoginUsername.value);
    

    if(currentAccaunt?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
        labelWelcome.textContent = `Welcome back, ${currentAccaunt.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;

    //Clear input field
        inputLoginUsername.value = inputLoginPin.value = '';
        
    }
    inputLoginPin.blur();  
    // Update UI
    updateUI(currentAccaunt);
    
});

// Transfering amount

btnTransfer.addEventListener('click', (e)=> {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accaunts.find((acc) => acc.username === inputTransferTo.value);
    
    if( amount > 0 && 
        receiverAcc &&
        receiverAcc?.username !== currentAccaunt.username &&
        currentAccaunt.balance >= amount
    ) {
        currentAccaunt.movements.push(-amount);
        receiverAcc.movements.push(amount);
        // Update UI
        updateUI(currentAccaunt);
    }
    inputTransferAmount.value = inputTransferTo.value = '';

});

btnClose.addEventListener('click', (e)=> {
    e.preventDefault();
    if(inputCloseUsername?.value === currentAccaunt.username
        && Number(inputClosePin?.value) === currentAccaunt?.pin){
            const index = accaunts.findIndex(acc=> acc.username === currentAccaunt.username)
            accaunts.splice(index, 1);
            //Hide UI 
            containerApp.style.opacity = 0;
        }
        inputCloseUsername.value = inputClosePin.value = '';
});

btnLoan.addEventListener('click', (e)=> {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);

    if(amount > 0 && currentAccaunt.movements.some((mov)=> mov > amount * 0.1)) {
        // Add movement
        currentAccaunt.movements.push(amount);

        // Update UI
        updateUI(currentAccaunt);

    }

    inputLoanAmount.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function(e) {
    e.preventDefault();
    displayMovements(currentAccaunt.movements, !sorted);
    sorted = !sorted;
});
const movementsArr = [232, -2334, -130, 12000, -6840, -9000, 5600];

alert('Hello new sction');













