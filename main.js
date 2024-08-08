#! /usr/bin/env node
import { input, select } from "@inquirer/prompts";
;
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    ;
    // Debit Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
        }
        else {
            console.log("Insufficient Balance.");
        }
        ;
    }
    ;
    // Credit Money
    deposit(amount) {
        if (amount >= 100) {
            amount -= 1; // 1 dollar fee charged if amount greater than 100.
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining Balance is: $${this.balance}`);
    }
    ;
    // Check Balance
    checkBalance() {
        console.log(`Current Balance: $${this.balance}`);
    }
    ;
}
;
// Customer Class
class Customer {
    firstName;
    lastName;
    age;
    gender;
    mobileNumber;
    account;
    constructor(fName, lName, age, gender, mobileNumber, account) {
        this.firstName = fName;
        this.lastName = lName;
        this.age = age;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
    ;
}
;
// Create Bank Accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 800),
    new BankAccount(1003, 1500)
];
// create Customers
const customers = [
    new Customer("Ghulam", "Mustafa", 21, "Male", 3172720786, accounts[0]),
    new Customer("Muhammad", "Ausaf", 18, "Male", 3012720715, accounts[1]),
    new Customer("Ahmed", "Raza", 26, "Male", 3202720716, accounts[2]),
];
async function service() {
    do {
        const inputAccountNumber = await input({ message: "Enter Your Account Number: " });
        let accNum = parseFloat(inputAccountNumber);
        const customer = customers.find(customer => customer.account.accountNumber === accNum);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await select({
                message: "Please select operation: ",
                choices: [
                    { name: "Deposit", value: "Deposit" },
                    { name: "Withdraw", value: "Withdraw" },
                    { name: "Check Balance", value: "Check Balance" },
                    { name: "Exit", value: "Exit" }
                ]
            });
            switch (ans) {
                case "Deposit":
                    const deposit = await input({ message: "Enter the amount to deposit: " });
                    const depositAmount = parseFloat(deposit);
                    customer.account.deposit(depositAmount);
                    break;
                case "Withdraw":
                    const withdraw = await input({ message: "Enter the amount to deposit: " });
                    const withdrawAmount = parseFloat(withdraw);
                    customer.account.withdraw(withdrawAmount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting Bank Program...");
                    console.log("Thank you for using our bank services. Have a great day!");
                    process.exit();
            }
        }
        else {
            console.log("Invalid account number. Please try again.");
            process.exit();
        }
        ;
    } while (true);
}
;
service();
