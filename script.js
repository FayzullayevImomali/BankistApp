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

const calcDisplayBalance = function (movements) {
    const balance = movements.reduce((accum, current)=> {
        return accum + current;
    },0);
    labeleBalance.textContent = `${balance} UZS`;
}
calcDisplayBalance(accaunt1.movements)

const createUserName = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map((name) => name[0]).join('');
    });

};

createUserName(accaunts);
console.log(accaunts);













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

// const euroToUsd = 1.1;

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

const deposits = movementsArr.filter(function(mov) {
    return mov > 0;
});

console.log(deposits);

const withdrawal = [232, -2334, 5000, 43000, -6840, -9000, 5600];

const spendDeposits = withdrawal.filter(function (value) {
    return value < 0;
});

console.log(spendDeposits);



//                                        Reduce method                         //

const balance = movementsArr.reduce((accum, current, index, array) => {
    console.log(`Iteration ${index}: ${accum}`);
    return accum + current;
},0);

console.log(balance);

// Maximum value from array using REDUCE method 

const max = movementsArr.reduce((acc, mov)=> {
    if(acc > mov) return acc;
    else return mov;
}, movementsArr[0]);

console.log(max);


//                                Coding challenge 2                  //

//map 
//filter
//reduce

const calcAverageHumanAga = function(ages) {
    const humanAges =  ages.map(function(dogAge) {
        if(dogAge <= 2) {
            return dogAge * 2;
        } else {
        return (dogAge * 4) + 16; 
        }
        // dogAge => dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
    });
    const adultAges = humanAges.filter(function(age) {
        return age >= 18;
    });
    console.log(adultAges)
    const summDogAges = adultAges.reduce(function(accum, current){
        return accum + current;
    }, 0);

    // const average = adultAges.reduce((acc, age, i, arr) {
    //     acc + age / arr.length;
    // })

    const average = Math.trunc( summDogAges / adultAges.length);
   
    console.log(`The Average ages of dog's is ${average}`);
}
calcAverageHumanAga( [5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAga( [16, 6, 10, 5, 6, 1, 4]);







