'use strict';
var request = require('request');

function getCountriesList(callback){
    const url = process.env.COUNTRIES_LIST_URL;
    let defaultCountries = process.env.DEFAULT_COUNTRY_CODES;
    const defaultCountriesList = defaultCountries.split(',');
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let countriesList = new Array();
            body.forEach(function (item, index){
                let country = {
                    name : String(item.name),
                    code : String(item.code),
                    checked : false
                };
                if (defaultCountriesList.includes(country.code)){
                    country.checked = true;
                    countriesList.unshift(country);
                } else {
                    countriesList.push(country);
                }
            });
            return callback(countriesList);
        }
    })
}
module.exports.getCountriesList = getCountriesList;