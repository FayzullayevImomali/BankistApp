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


//                                 Sort Method               //

//Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];

// console.log(owners.sort());
// console.log(owners);
// the sort method changes the original array and effects to it! 
// console.log(movementsArr);
//return < 0, A, B (keeps order)
//return > 0, B, A (changing order)
movementsArr.sort((a, b)=> {
    if(a > b) return 1;
    if(b > a) return -1;
} );

// console.log(movementsArr);

const points = [40, -100, 150, 200, 250, -300];

console.log(points.sort((a, b)=> b - a));






const myFish = ["angel", "clown", "mandarin", "sturgeon"];
const removed = myFish.splice(2, 0, "drum");
// console.log(myFish);








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

// const calcAverageHumanAga = function(ages) {
//     const humanAges =  ages
//     .map((dogAge)=>(dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
//     .filter((age)=> age >= 18)
//     .reduce((accum, age, i, arr) => accum + age / arr.length, 0);
//     // const average = adultAges.reduce((acc, age, i, arr) {
//     //     acc + age / arr.length;
//     // })
   
//     console.log(`The Average ages of dog's is ${Math.trunc(humanAges)}`);
// }
// calcAverageHumanAga( [5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAga( [16, 6, 10, 5, 6, 1, 4]);

// //                                     Chaining methods                   //

// const totalDepositUSD = movementsArr
//     .filter(mov=> mov > 0)
//     .map((mov, i , arr) => {return mov * euroToUsd;})
//     .reduce((acc, current)=> acc + current, 0);

// console.log(totalDepositUSD);



// //                                          The Find method                 //


// const first = movementsArr.find((value)=> value < 0);
// console.log(first);

// const accaunt = accaunts.find((user) => user.owner === 'Jessica Davis');
// console.log(accaunt);


//                                Some and every methods          //

// Some method
// QUALITY
// console.log(movementsArr.includes(-130));


// // CONDITIONS
// const anyDeposits = movementsArr.some(mov=> mov < 5000);
// console.log(anyDeposits);

// // Every method

// console.log(accaunt3.movements.every(mov => mov > 0));
// console.log(accaunt4.movements.every(mov => mov > 0));








// //                               call and bind methods                //

// call method
// const lufthanza = {
//     airline: 'LuftHanza',
//     iataCode: 'LH',
//     booking: [],
//     bookFunc(flightNum, name) {
//         console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`)
//         this.booking.push(`${name} booked a seat on ${this.airline}`, name);
//     }

// }
// console.log(lufthanza)

// lufthanza.bookFunc(12, 'Fayzullayev Imomali');

// const euroWings = {
//     airline: 'Eurowings',
//     iataCode: 'EUR',
//     booking: [],
// }


// const book = lufthanza.bookFunc;
// book.call(euroWings, 239 , 'Alex Cameron');
// console.log(euroWings);

// const persone = {
//     firstname: 'Mary',
//     lastname: 'Davis',
//     gender: 'male',
//     age: 25,
//     job: 'teacher',
//     displayData() {
//         const gender = this.gender === 'female' ? 'she is' : 'he is';
//         console.log(`this is ${this.firstname} ${this.lastname} ${gender} ${this.age} and ${gender} a ${this.job}`);
//     }
// };

// persone.displayData();

// const persone2 = {
//     firstname: 'Jessica',
//     lastname: 'Smith',
//     gender: 'female',
//     age: 32,
//     job: 'Devops enginer',
// }

// const displayData = persone.displayData;
// displayData.call(persone2);


// // bind method 

// const bookEW = book.bind(euroWings);
// const bookLH = book.bind(lufthanza);

// bookEW(400, 'Steven William');
// bookLH(500, 'Ali Fayzullayev');

//                                 Find index method             //
// const incomeMoney = [23, 22, 33 ,444];

// const spendMoney = incomeMoney[3];

// const indexIncome = incomeMoney.findIndex(inc=> inc === spendMoney);
// console.log(indexIncome);

// const ages = [3, 10, 18, 20];

// const checkAge = function (age) {
//     return age > 18
// }

// const adults = ages.findIndex(checkAge);
// console.log(adults);

//                                                  Flat and Flat map methods                     //
       // flat method
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

// console.log(arr.flat());

// const arrDeep = [['apelsin',['banan', 'mandarin']], ['potato', ['tomato', 'orange', 'cheer']], 8, 9];

// console.log(arrDeep.flat(2));

// //Calculating all movements form accounts
// const accountMovements = accaunts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overalBalance = allMovements.reduce((accum , mov) => accum + mov, 0);
// console.log(overalBalance);

// const overalBalance = accaunts
// .map(function(acc){
//     return acc.movements
// })
// .flat()
// .reduce(function(accum, mov) {
//     return accum + mov
// });
// console.log(overalBalance);


// //  flatMap method
// const overalBalance2 = accaunts
// .flatMap(acc=> acc.movements)
// .reduce(function(accum, mov) {
//     return accum + mov
// });

// console.log(overalBalance2);

//1
const bankDepositSumm = accaunts.map((acc)=> acc.movements)
.flat()
.filter((acc)=> acc > 0)
.reduce((summa, acc)=> summa + acc , 0);

//2 

// const numDeposit1000 = accaunts.flatMap((acc)=> acc.movements)
// .filter((acc)=> acc >= 1000).length;

const numDeposit1000 = accaunts.flatMap((acc)=> acc.movements)
.reduce((count, current)=> (current >= 1000 ? ++count : count),0);

console.log(bankDepositSumm);
console.log(numDeposit1000);

//3
// creating object using reduce method
const sums = accaunts.flatMap(acc => acc.movements)
.reduce(
    (sums, cur)=> {
        // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
        sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
        return sums;
    },
    {deposits: 0, withdrawals: 0}
);

console.log(sums);

//4.
//this is a nice title -> This Is a Nice Title
const convertTitleCase = function(title) {
    const capitalize = str => str[0].toUpperCase() + str.slice(1);

    const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

    const titleCase = title.toLowerCase().split(' ')
    .map(word=> exceptions.includes(word) ? word : capitalize(word)).join(' ');

    return capitalize(titleCase);

};




console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));


//                    Coding challenge 4 

const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1
dogs.forEach(cur=> cur.recommendedFood = Number((cur.weight ** 0.75 * 28).toFixed(2)))

console.log(dogs);

//2 

const dogSarah = dogs.find(dog=> dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(`Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recommendedFood ? 'much' : little
}`);

//3

const ownersEatTooMuch = dogs.
filter(owner=> owner.curFood > owner.recommendedFood)
.flatMap(owner=> owner.owners);
console.log(ownersEatTooMuch);

const ownersEatFooLittle = dogs.filter(owner=> owner.curFood < owner.recommendedFood)
.flatMap(owner=> owner.owners );

console.log(ownersEatFooLittle);

//4 
console.log(`${ownersEatTooMuch.join(' and ')} dogs eat too much!`);
console.log(`${ownersEatFooLittle.join(' and ')} dogs eat too little!`);

//5

console.log(dogs.some(dog=> dog.curFood === dog.recommendedFood));

//6
const checkEatingOkay = dog => dog.curFood > dog.recommendedFood * 0.9
 && dog.curFood < dog.recommendedFood *1.1;
console.log(dogs.some(checkEatingOkay));

//7
const okayAmount = dogs.filter(checkEatingOkay);
console.log(okayAmount);

// 8

const dogsSortedCopy = dogs.slice().sort((a, b)=> a.curFood - b.curFood);
console.log(dogsSortedCopy);




// const names = ['Imomali', 'Axrorali', 'Azizbek', 'Bekzod', 'Alimjon'];

// const filteredNames = names.filter(current=> current.includes('a')).map(curr=> curr[0])
 
// console.log(filteredNames);












