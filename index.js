class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    // calculate balance using the transaction objects
    if (!this.transactions[0]) return 0;


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
    if (this.isAllowed()) {
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add transaction to account
      this.account.addTranscation(this);
      return true;
    }
    return false;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  // This was MY version of isAllowed()
  // isAllowed() {
  //   if (this.account.balance + this.value < 0) {
  //     return false;
  //   }
  //   return true;
  // }

  // Here is the less verbose, refactored isAllowed()
  isAllowed() {
    return (this.account.balance + this.value >= 0);
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("Peter Parker");

const t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log("This is the balance after the withdrawing $50.25", myAccount.balance);

const t2 = new Deposit(120, myAccount);
t2.commit();
console.log("This is the balance after depositing $120", myAccount.balance);

const t3 = new Withdrawal(120, myAccount);
t3.commit();
console.log("this is the balance after withdrawing ALL $120!!", myAccount.balance);

console.log("These are the transactions made so far: ", myAccount.transactions);
