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

const accaunts = [accaunt1, accaunt2, accaunt3, accaunt4];

//                  Elements          //
const labelWelcome = document.querySelector('.welcome');
const labelData = document.querySelector('.date');
const labeleBalance = document.querySelector('.balance__value');
const labalSumIn = document.querySelector('.summary__value--in');
const labelSumOut  = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--in');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btm--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn-sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//                         gooo               //

const displayMovements  = function (movements) {
    containerMovements.innerHTML = '';
    movements.forEach((mov, index)=>{
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
            <div class="movements__row">
                <div class="movements__type movements__type--${type}">${index}</div>
                <div class="movements__value">${mov}</div>
            </div>
        `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    })
}
displayMovements(accaunt1.movements);









// Coding challenge
1.
const juliaceDogs = [3, 5, 2, 12, 7];
const  KatesDogs = [4, 1, 15, 8, 3];
const copyjuliace = [...juliaceDogs.slice(0,3)];
console.log(copyjuliace);


const checkDogs = function (array1 , array2) {
    const dogsKatty = array1.slice(0,3)
}








