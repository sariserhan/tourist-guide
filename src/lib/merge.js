const globe = require("./globe.json");
const flag = require("./flag.json")

const fs = require('fs');


globe.features.forEach(({properties}) => {
    flag.find(({country, flag_base64}) => {
        properties.name === country &&
        (properties.flag = flag_base64)
    })
})
merge(globe)

console.log(globe.features[0].properties)


// glob.features.forEach(({properties}) => {
    // flag.find(({country, flag_base64}) => {
    //     properties.name === country &&
    //     (properties.flag = flag_base64)
    // })
// });

// console.log(glob.features[0].properties)


function merge(data) {
    const jsonData = JSON.stringify(data, null, 2);
    const filePath = 'output.json';

    fs.writeFile(filePath, jsonData, (err) => {
        if (err) {
        console.error('Error writing file:', err);
        return;
        }
        console.log('Data written to file successfully!');
    });
}

