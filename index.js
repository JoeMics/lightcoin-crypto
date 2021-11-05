class Account {
  constructor(username) {
    this.username = username;
    this.balance = 0;
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
}

class Withdrawal extends Transaction {
  commit() {
    this.account.balance -= this.amount;
  }
}

class Deposit extends Transaction {
  commit() {
    this.account.balance += this.amount;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

const t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log(myAccount.balance);

// const t2 = new Withdrawal(9.99);
// t2.commit();
// console.log('Transaction 2:', t2);

// console.log('Balance:', balance);


// const t3 = new Deposit(120.00);
// t3.commit();
// console.log('Transaction 3:', t3);
