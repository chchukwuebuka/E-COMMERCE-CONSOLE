const rLine = require('readline');
const cmd = rLine.createInterface(process.stdin, process.stdout);

class Television {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    calculateTotalPrice(quantity) {
        return this.price * quantity;
    }
}

const televisionStore = [
    new Television('Samsung', 10000, 2),
    new Television('LG', 9000, 1),
    new Television('Panasonic', 9500, 3),
    new Television('TLC', 8000, 1),
];

console.log('Welcome to our Television Store');

function userValidation()
{
    cmd.question('Enter username: ', (username) => {
        cmd.question('Enter password: ', (password) => {
            if (isValidCredentials(username, password)) {
                console.log('Password successful!');
                startShopping();
            } else {
                console.log('Invalid Username or Password. Exiting...');
                cmd.close();
            } 
        });
    });
}

function isValidCredentials(username, password) {
    const validUsername = 'chukwuebuka';
    const validPassword = '12345';
    return username === validUsername && password === validPassword;
}

function startShopping() {
    televisionStore.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name.padEnd(23)} ${item.price}/`);
        console.table(televisionStore);
    });

    cmd.question(`What type of television do you want to buy?\n`, (input) => {
        const inputLower = input.toLowerCase();

        switch (inputLower) {
            case 'samsung':
            case 'lg':
            case 'panasonic':
            case 'tlc':
                const selectedTelevision = televisionStore.find(tv => tv.name.toLowerCase() === inputLower);
                cmd.question(`How many ${selectedTelevision.name} do you want to buy?\n`, (quantity) => {
                    const totalBill = selectedTelevision.calculateTotalPrice(parseInt(quantity, 10));
                    console.log(`Your bill for ${quantity} ${selectedTelevision.name}(s) is $${totalBill}.`);

                    paymentProcess(totalBill, (paymentStatus) => {
                        if (paymentStatus === 'success') {
                            console.log('Payment successful!');
                            console.log('Thank you for your purchase.');
                        } else {
                            console.log('Payment failed. Please try again.');
                        }
                        cmd.close();
                    });
                });
                break;

            default:
                cmd.question(`We are out of stock. Thanks for patronizing us. Press 2 to exit or drop a feedback.\n`, (name) => {
                    console.log('Thanks for your feedback');
                    cmd.close();
                });
                break;
        }
    });
}

function paymentProcess(amount, callback) {
    cmd.question(`Enter your credit card number: `, (creditCard) => {
        const paymentStatus = Math.random() < 0.8 ? 'success' : 'failure'; 
        callback(paymentStatus);
    });
}

cmd.on('close', () => {
    console.log('Hope to see you some other time, buy.....');
});

userValidation();