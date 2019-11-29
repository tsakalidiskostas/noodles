'use strict';
var request = require('./node_modules/request');

// process.env.PRODUCTION_URL = https://m1rerate1.erate.no/v1/api


function mainUserCreate(user){
    let id = "/" + (user.id != "") ? user.id : user.i_customer;
    const userurl = process.env.PRODUCTION_URL+"/accounts"+id+"/create-user";
    let now = new Date();

    let mainUser = {
        firstname : String(user.firstname),
        lastname : String(user.lastname),
        accountId : String(user.accountId),        
        birthdate : Date(user.birthdate), //Date(account.birthdate),
        gender : String(user.gender), //String(account.gender),
        address1 : String(user.address1),
        street : String(user.street),
        streetNumber : String(user.streetNumber), // separate ? 
        zip : String(user.zip),
        city : String(user.city),
        country : String(user.country),
        phone1 : String(user.phone1),
        email : String(user.email),
        fax : String(user.fax),
        personalId: String(user.personalId),
        address2 : String(user.address2),
    };

    // Create main user
    request.post({
        url: userurl,
        options: function(){
            json: true;
            body: mainUser;
        }
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let userCreated = {
                id : String(body.id),
                accountId : String(body.accountId),
                firstname : String(body.firstName),
                lastname: String(body.lastName),
                username: String(body.username),

                created : true
            }
            return userCreated;
        }
    });

}

function mobileUserCreate(user){
    let id = (user.id != "") ? user.id : user.i_customer;
    const userurl = process.env.PRODUCTION_URL+"/accounts/"+id+"/create-user";

    let eRateuser = {
        firstname : String(user.FirstName__c),
        accountId : String(user.accountId),
        lastname : String(user.LastName__c),
        birthdate : Date(user.PortingOwnerBirthdate__c)+"T00:00:00.000Z", //THISISAJOKE.jpg
        gender : String("M"), //String(account.gender),
        address1 : String(JSON.stringify(user.BillingAddress)),
        street : String(user.BillingAddress.BillingStreet),
        streetNumber : String(user.BillingAddress.BillingStreet), // separate ? 
        zip : String(user.BillingAddress.BillingZip),
        city : String(user.BillingAddress.BillingCity),
        country : String(user.BillingAddress.BillingCountry),
        phone1 : String(user.Name), // Name in the MobileUser obj is MobileUser Number
        email : String(user.PersonEmail),
        fax : String(user.Fax),
        personalId: String(user.PortingOwnerOrgNumber__c),
        address2 : String(JSON.stringify(account.PhysicalAddress)),
        customAttributes: {
            portingownerbirthdate: Date(user.PortingOwnerBirthdate__c),
            portingownername: String(user.PortingOwnerName__c), 
            portingownerorgnumber: String(user.PortingOwnerOrgNumber__c),
        },
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
                firstname : String(body.firstName),
                lastname: String(body.lastName),
                username: String(body.username),

                created : true
            }
            return userCreated;
        }
    });

}

function userCall(callback){
    const url = process.env.COUNTRIES_LIST_URL;
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            return "success";
        }
    })
}

module.exports.user = {
    mainUserCreate,
    mobileUserCreate,
    userCall,
}