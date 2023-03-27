'use strict';

//            Bankist App             //

//               Data

const accaunt1 = {
    owner: 'Imomali Fayzullayev',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111,
    currency: 'UZS'
};


const accaunt2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, 3210, 1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
      ],
      currency: 'USD',
      locale: 'en-US',
};

const accaunt3 = {
    owner: 'Steven Thomas William',
    movements: [200, -200, 340, -20, 50, 400, -460],
    interestRate: 1,
    pin: 4444,
    currency: 'EUR'
};

const accaunt4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 3333,
    currency: 'EUR'
};

const accaunt5 = {
    owner: 'Jones Schmadtmenn',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 5555,
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2020-07-12T10:51:36.790Z',
      ],
      currency: 'EUR',
      locale: 'pt-PT', // de-DE
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
                <div class="movements__value">${mov} ${currentAccaunt.currency}</div>
            </div>
        `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
}


const calcDisplayBalance = function (accaunt) {
    accaunt.balance = accaunt?.movements.reduce((accum, current)=> {
        return accum + current;
    },0);
    labeleBalance.textContent = `${accaunt.balance} ${currentAccaunt.currency}`;
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
    

    if(currentAccaunt?.pin === +(inputLoginPin.value)) {
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
    const amount = +(inputTransferAmount.value);
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
        && +(inputClosePin?.value) === currentAccaunt?.pin){
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

console.log(23 === 23.0);

//Base ten => 10 - 0 to 9
//Binar base 2 - 0 and 1

console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

console.log(Number('233'));
console.log(+'333');

//Parsing

console.log(Number.parseInt('50px', 10));

console.log(Number.parseInt('e444', 10));

console.log(parseFloat('34.5rem', ));


// IsNaN checking any value is not a number!

console.log(isNaN(23));
console.log(isNaN('y2333'));
console.log(isNaN(23 / 0));
console.log(isNaN(+'56x'));


console.log(Number.isFinite(20));
console.log(Number.isFinite(+'333'));
console.log(Number.isFinite(23.5));

//               Math and Round

















