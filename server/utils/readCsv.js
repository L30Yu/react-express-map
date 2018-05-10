// Read the CSV file.
const fs = require('fs');
const path = require('path');
const csv = require('csv');
let addresses = [];

function getAddresses() {
    return new Promise((resolve, reject) => {
        if (addresses && addresses.length > 0) {
            resolve(addresses);
        }
        try {
            let csvFile = fs.readFileSync(path.join(__dirname, './addresses.csv'));
            csv.parse(csvFile, function (err, data) {
                addresses = data.filter((value, index) => index !== 0)
                    .map((value) => {
                        return value[0];
                    });
                resolve(addresses);
            });
        } catch (error) {
            console.error('Error: couldn\'t read csv file. ' + error);
            reject(error);
            process.exit(1);
        }
    });
}
module.exports = getAddresses;
