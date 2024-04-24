const globe = require("./globe.json");
const government_type = require("./government_type.json");
const cities = require("./cities.json")
const continent = require("./continent.json")
const currency = require("./currency.json")
const currency_code = require("./currency_code.json")
// const flag = require("./flag.json")
const languages = require("./languages.json")
const life_expectancy = require("./life_expectancy.json")
const national_dish = require("./national_dish.json")
const phone_codes = require("./phone_codes.json")
const population = require("./population.json")
const religion = require("./religion.json")
const region = require("./region.json")
const surface_area = require("./surface_area.json")
const yearly_avg_temp = require("./yearly_avg_temp.json")

const fs = require('fs');


globe.features.forEach(({properties}) => {
    phone_codes.find(({country, calling_code}) => {
        properties.name === country &&
        (properties.calling_code = calling_code)
    })
    government_type.find(({country, government}) => {
        properties.name === country &&
        (properties.government = government)
    })
    cities.find(({country, cities}) => {
        properties.name === country &&
        (properties.cities = cities)
    })
    continent.find(({country, continent}) => {
        properties.name === country &&
        (properties.continent = continent)
    })
    currency.find(({country, currency_name}) => {
        properties.name === country &&
        (properties.currency = currency_name)
    })
    currency_code.find(({country, currency_code}) => {
        properties.name === country &&
        (properties.currency_code = currency_code)
    })
    languages.find(({country, languages}) => {
        properties.name === country &&
        (properties.languages = languages)
    })
    life_expectancy.find(({country, expectancy}) => {
        properties.name === country &&
        (properties.life_expectancy = expectancy)
    })
    national_dish.find(({country, dish}) => {
        properties.name === country &&
        (properties.national_dish = dish)
    })
    population.find(({country, population}) => {
        properties.name === country &&
        (properties.population = population)
    })
    religion.find(({country, religion}) => {
        properties.name === country &&
        (properties.religion = religion)
    })
    region.find(({country, location}) => {
        properties.name === country &&
        (properties.region = location)
    })
    surface_area.find(({country, area}) => {
        properties.name === country &&
        (properties.surface_area = area)
    })
    yearly_avg_temp.find(({country, temperature}) => {
        properties.name === country &&
        (properties.yearly_avg_temperature = temperature)
    })









    // flag.find(({country, flag_base64}) => {
    //     properties.name === country &&
    //     (properties.flag = flag_base64)
    // })


})
merge(globe)

console.log(globe.features[0].properties)


// glob.features.forEach(({properties}) => {
//     capital.features.find(({properties: {country, city}}) => {
//         if (properties.name === country) {
//             properties.capital = city
//         }
//     })
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

