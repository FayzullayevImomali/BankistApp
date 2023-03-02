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
const labelSumInterest = document.querySelector('.summay__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
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
                <div class="movements__value">${mov} EUR</div>
            </div>
        `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    })
}


const calcDisplayBalance = function (accaunt) {
    accaunt.balance = accaunt.movements.reduce((accum, current)=> {
        return accum + current;
    },0);
    labeleBalance.textContent = `${accaunt.balance} UZS`;
}


const calcDisplaySummary = function (accaunt) {
    const incomes = accaunt.movements
        .filter((mov)=> mov > 0)
        .reduce((accum, mov)=> accum + mov, 0 );
    labalSumIn.textContent = `${incomes} EUR`;

    const outgoing = accaunt.movements
        .filter((mov)=> mov < 0)
        .reduce((accum, mov)=> accum + mov, 0);
    labelSumOut.textContent = `${Math.abs(outgoing)} EUR`;   
    
    const interest = accaunt.movements
        .filter((mov)=> mov > 0)
        .map((deposit) => (deposit * accaunt.interestRate) / 100)
        .filter((int, i, arr) => {
            return int >= 1;
        })
        .reduce((accum, interest)=> accum + interest, 0)
    labelSumInterest.textContent = `${interest} EUR`;      
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
        inputLoginPin.blur();

    // Display movements
        displayMovements(currentAccaunt.movements);
    // Display balance
        calcDisplayBalance(currentAccaunt);
    // Display summary
        calcDisplaySummary(currentAccaunt);
        console.log('Login!');
    }
});

// Transfering amount

btnTransfer.addEventListener('click', function(e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receriverAcc = accaunts.find(
        acc => acc.username === inputTransferTo.value);
    console.log(amount, receriverAcc); 
    
    if(
        amount > 0 &&
        receriverAcc &&
        currentAccaunt.balance >= amount &&
        receriverAcc?.username !== currentAccaunt.username
    ) {
        currentAccaunt.movements.push(-amount);
        receriverAcc.push(amount);
    }
    
});
console.log(btnTransfer);












// Coding challenge
1.
// const juliaceDogs = [3, 5, 2, 12, 7];
// const  KatesDogs = [4, 1, 15, 8, 3];
// // const copyjuliace = concat(juliaceDogs, KatesDogs);
// // console.log(copyjuliace);


// const checkDogs = function (dogsJulia, dogsKate) {
//     const currectDogs = dogsJulia.slice(1,3).concat(dogsKate);
//     currectDogs.forEach((value, index )=> {
//         const type = value >= 3 ? 'an adult' : 'a puppy';
//         console.log(`Dog number ${index + 1} is ${type} its ${value} years old`); 
//     });
//     console.log(currectDogs);
// }

// checkDogs(juliaceDogs, KatesDogs);

// //                       (map filter reduce).array methods    //

// const movementCopy = [5000, 3400, -150, -790, 3210, 1000, 8500, -30];

const euroToUsd = 1.1;

// const movementUSD =  movementCopy.map(mov => mov * euroToUsd ); //With Arrow function 


// console.log(movementUSD);

// const movementsUZS = [];

// for(const mov of movementCopy) {
//     movementsUZS.push(mov * euroToUsd);
// }

// console.log(movementsUZS);

// const movementDescription =  movementCopy.map(function(value, index, arr) {
//     return `Movements ${index + 1} ${value > 0 ? 'deposited' : 'withdrew'} ${value}`
// });

// console.log(movementDescription);

//                                       Filter method                    //

 const movementsArr = [232, -2334, 5000, 12000, -6840, -9000, 5600];

// const deposits = movementsArr.filter(function(mov) {
//     return mov > 0;
// });

// console.log(deposits);

// const withdrawal = [232, -2334, 5000, 43000, -6840, -9000, 5600];

// const spendDeposits = withdrawal.filter(function (value) {
//     return value < 0;
// });

// console.log(spendDeposits);



// //                                        Reduce method                         //

// const balance = movementsArr.reduce((accum, current, index, array) => {
//     console.log(`Iteration ${index}: ${accum}`);
//     return accum + current;
// },0);

// console.log(balance);

// // Maximum value from array using REDUCE method 

// const max = movementsArr.reduce((acc, mov)=> {
//     if(acc > mov) return acc;
//     else return mov;
// }, movementsArr[0]);

// console.log(max);


// //                                Coding challenge 2                  //

// //map 
// //filter
// //reduce

const calcAverageHumanAga = function(ages) {
    const humanAges =  ages
    .map((dogAge)=>(dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter((age)=> age >= 18)
    .reduce((accum, age, i, arr) => accum + age / arr.length, 0);
    // const average = adultAges.reduce((acc, age, i, arr) {
    //     acc + age / arr.length;
    // })
   
    console.log(`The Average ages of dog's is ${Math.trunc(humanAges)}`);
}
calcAverageHumanAga( [5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAga( [16, 6, 10, 5, 6, 1, 4]);

//                                     Chaining methods                   //

const totalDepositUSD = movementsArr
    .filter(mov=> mov > 0)
    .map((mov, i , arr) => {return mov * euroToUsd;})
    .reduce((acc, current)=> acc + current, 0);

console.log(totalDepositUSD);



//                                          The Find method                 //


const first = movementsArr.find((value)=> value < 0);
console.log(first);

const accaunt = accaunts.find((user) => user.owner === 'Jessica Davis');
console.log(accaunt);











