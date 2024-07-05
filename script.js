"use strict";

// Data
const account1 = {
  owner: "Tamana Farzami",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2024-05-18T23:36:17.929Z",
    "2024-05-23T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account2 = {
  owner: "Samira Farzami",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Alina Farzami",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:16:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2022-07-11T23:36:17.929Z",
    "2023-07-12T10:51:36.790Z",
  ],
  currency: "AFN",
  locale: "fa-IR",
};

const account4 = {
  owner: "Farahnaz Farzami",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2018-12-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2021-06-25T18:49:59.371Z",
    "2022-07-26T12:01:20.894Z",
  ],
  currency: "KRW",
  locale: "ko-KA",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
const operations = document.querySelector("operation");

function timeMoveIngine(time, loc) {
  const daysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const main = daysPassed(new Date(), time);
  if (main === 0) return "Today";
  if (main === 1) return "Yesterday";
  if (main <= 7) return `${main} Days Ago`;
  else {
    return Intl.DateTimeFormat(loc).format(time);
  }
}

function numFormatingEng(val, loc, cur) {
  return new Intl.NumberFormat(loc, {
    style: "currency",
    currency: cur,
  }).format(val);
}

function displayMovementEng(acc, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (item, ind) {
    const type = item > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDates[ind]);
    const displayTime = timeMoveIngine(date, acc.locale);
    const formatedMov = numFormatingEng(item, acc.locale, acc.currency);
    const main = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      ind + 1
    } ${type}</div>
    <div class="movements__date" style="font-size: 15px">${displayTime}</div>
    <div class="movements__value">${formatedMov}</div>
  </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", main);
  });
}

function logOut() {
  function main() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min} : ${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }
    time--;
  }
  let time = 600;
  main();
  const timer = setInterval(main, 1000);
  return timer;
}

function userNameEn(accs) {
  accs.forEach(function (acc) {
    // add a map after split it you want to get 'tf' and remove at .
    acc.username = acc.owner.toLowerCase().split(" ")[0];
  });
}
userNameEn(accounts);
function balanceEng(accs) {
  const movementEl = accs.movements.reduce((acc, item) => acc + item, 0);
  accs.balance = movementEl;

  labelBalance.textContent = numFormatingEng(
    movementEl,
    accs.locale,
    accs.currency
  );
}

function summaryEng(accs) {
  const depositSum = accs.movements
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0);

  const withdrawSum = accs.movements
    .filter((item) => item < 0)
    .reduce((acc, item) => acc + item, 0);

  const interest = accs.movements
    .filter((item) => item > 0)
    .map((item) => (item * accs.interestRate) / 100)
    .filter((item) => item >= 1)
    .reduce((acc, item) => acc + item);

  labelSumInterest.textContent = numFormatingEng(
    accs.balance,
    accs.locale,
    accs.currency
  );
  labelSumIn.textContent = numFormatingEng(
    depositSum,
    accs.locale,
    accs.currency
  );
  labelSumOut.textContent = numFormatingEng(
    Math.abs(withdrawSum),
    accs.locale,
    accs.currency
  );
}
function updateUIIngine(item) {
  displayMovementEng(item);

  balanceEng(item);
  summaryEng(item);
}

let currentAccount, timer;
btnLogin.addEventListener("click", function (event) {
  event.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Happy to See You 😊, ${currentAccount.username}`;
    containerApp.style.opacity = 100;

    // Times
    const now = new Date();
    const date = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      date
    ).format(now);

    labelDate.style.fontSize = "15px";

    inputLoginUsername.value = inputLoginPin.value = "";
    //stop focus
    inputLoginPin.blur();
    if (timer) clearInterval(timer);
    timer = logOut();
    updateUIIngine(currentAccount);
  } else {
    containerApp.style.opacity = 0;
    inputLoginUsername.value = inputLoginPin.value = "";
    labelWelcome.textContent = " Log in to get started";
    alert("Wrong Username or Password, Try Again!!!");
  }
});

btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();
  const transAmount = +inputTransferAmount.value;
  const transAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  // cleaning
  inputTransferAmount.value = inputTransferTo.value = "";
  clearInterval(timer);
  timer = logOut();
  if (
    transAccount?.username !== currentAccount.username &&
    transAmount > 0 &&
    transAccount &&
    currentAccount.balance >= transAmount
  ) {
    currentAccount.movements.push(-transAmount);
    transAccount.movements.push(transAmount);
    currentAccount.movementsDates.push(new Date().toISOString());
    transAccount.movementsDates.push(new Date().toISOString());
    updateUIIngine(currentAccount);
  } else {
    alert("The Transfer Is Invalid! Try Again");
  }
});

btnLoan.addEventListener("click", function (event) {
  event.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);
  inputLoanAmount.value = "";
  clearInterval(timer);
  timer = logOut();
  if (
    loanAmount > 0 &&
    currentAccount.movements.some((item) => item >= loanAmount / 10)
  ) {
    setTimeout(() => {
      currentAccount.movements.push(loanAmount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUIIngine(currentAccount);
    }, 3000);
  } else {
    alert(
      `You are not valid to give ${loanAmount} loan!\n You can have less !`
    );
  }
});

btnClose.addEventListener("click", function (event) {
  event.preventDefault();
  let closePin = +inputClosePin.value;
  let closeUseName = inputCloseUsername.value;
  if (
    currentAccount.username === closeUseName &&
    currentAccount.pin === closePin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = "This Account Is Deleted ‼ ";
  } else {
    console.log(`Wrong Password or Username`);
  }
  inputClosePin.value = inputCloseUsername.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (event) {
  event.preventDefault();

  // const arraySorting = (fir, sec) => {
  //   let main = [];
  //   for (let i = 0; i < fir.length; i++) {
  //     main.push({ value1: fir[i], value2: sec[i] });
  //   }
  //   main.sort((a, b) => b.value2 - a.value2);

  //   for (let j = 0; j < main.length; j++) {
  //     fir[j] = main[j].value1;
  //     sec[j] = main[j].value2;
  //   }
  // };
  // arraySorting(currentAccount.movements, currentAccount.movementsDates);
  clearInterval(timer);
  timer = logOut();
  updateUIIngine(currentAccount);
  displayMovementEng(currentAccount, !sorted);
  sorted = !sorted;
});
