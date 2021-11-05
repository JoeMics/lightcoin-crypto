class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    // calculate balance using the transaction objects

    // can't use .reduce on an array with one element
    if (this.transactions.length === 1) {
      return this.transactions[0].value;
    }

    // sum of all the transaction values
    return this.transactions.reduce((prev, curr) => {
      return prev.value + curr.value;
    });
  }

  addTranscation(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add transaction to account
    this.account.addTranscation(this);
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

const t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log("This is the balance after the withdrawing $50.25", myAccount.balance);

const t2 = new Deposit(120, myAccount);
t2.commit();
console.log("This is the balance after depositing $120", myAccount.balance);

console.log("These are the transactions made so far: ", myAccount.transactions);
