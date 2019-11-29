'use strict';
var request = require('./node_modules/request');
var user = require('user');

// process.env.PRODUCTION_URL = https://m1rerate1.erate.no/v1/api


function accountCreate(account){
    const accounturl = process.env.PRODUCTION_URL+"/accounts/"+account.i_customer+"/create-account";
    let now = new Date();

    let eRateAccountuser = {
        firstname : String(account.Name),
        lastname : "", //String(account.lastname),
        accountId : String(account.accountId),        
        birthdate : Date(now.toISOString().slice(0, 10))+"T00:00:00.000Z", //Date(account.birthdate),
        gender : String("M"), //String(account.gender),
        address1 : String(JSON.stringify(account.BillingAddress)),
        street : String(account.BillingAddress.BillingStreet),
        streetNumber : String(account.BillingAddress.BillingStreet), // separate
        // building : String(account.building),
        // floor : String(account.floor),
        zip : String(account.BillingAddress.BillingZip),
        personalId: String(account.Org_nr__c),
        city : String(account.BillingAddress.BillingCity),
        country : String(account.BillingAddress.BillingCountry),
        // poBox : String(account.poBox),
        phone1 : String(account.Phone),
        email : String(account.PersonEmail),
        fax : String(account.Fax),
        address2 : String(JSON.stringify(account.PhysicalAddress)),
        // username : String(account.mainuser.username),
        // password : String(account.mainuser.password),
    };

    // Create user for account to be tied to. Can be that this creates the account as well, waiting for Roi
    let userCreated = user.mainUserCreate(eRateAccountuser);
    
    // Create account??
    // Create billinggroup??

    // request.post({
    //     url: url,
    //     options: function(){
    //         json: true;
    //         body: account;
    //     }
    // }, function (error, response, body) {
    //     if (!error && response.statusCode === 200) {
    //         let userCreated = {
    //             id : String(body.id),
    //             accountId : String(body.accountId),
    //             firstname : String(body.firstname),
    //             created : true
    //         }

    //         return userCreated;
    //     }
    // });
    return userCreated;
}

function accountCall(callback){
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
    accountCreate,
    accountCall,
}