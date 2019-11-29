'use strict';
var request = require('./node_modules/request');

// process.env.PRODUCTION_URL = https://m1rerate1.erate.no/v1/api


function productCreate(user){
    let id = (user.id != "") ? user.id : user.i_customer;
    const userurl = process.env.PRODUCTION_URL+"/accounts/"+id+"/create-user";

    let eRateuser = {
        firstname : String(user.Name),
        accountId : String(user.accountId),
        lastname : "", //String(account.lastname),
        birthdate : Date(today()), //Date(account.birthdate),
        gender : String("M"), //String(account.gender),
        address1 : String(JSON.stringify(user.BillingAddress)),
        street : String(user.BillingAddress.BillingStreet),
        streetNumber : String(user.BillingAddress.BillingStreet), // separate ? 
        zip : String(user.BillingAddress.BillingZip),
        city : String(user.BillingAddress.BillingCity),
        country : String(user.BillingAddress.BillingCountry),
        phone1 : String(user.Phone),
        email : String(user.PersonEmail),
        fax : String(user.Fax),
        address2 : String(JSON.stringify(account.PhysicalAddress)),
    };

    // Create user
    request.post({
        url: userurl,
        options: function(){
            json: true;
            body: eRateuser;
        }
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let userCreated = {
                id : String(body.id),
                accountId : String(body.accountId),
                firstname : String(body.firstname),
                created : true
            }

            return userCreated;
        }
    });

}

function productCall(callback){
    const url = process.env.COUNTRIES_LIST_URL;
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            /* let countriesList = new Array();
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
            }); */
            return "success";
        }
    })
}

module.exports.account = {
    userCreate,
    userCall,
}