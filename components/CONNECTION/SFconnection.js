const csv = require('csv-parser')
const fs = require('fs')
const results = [];

const jsforce = require('jsforce');
const account = rootRequire('components/eRateSOAP/Account');
const contract = rootRequire('components/eRateSOAP/Contract');

const soap = require('soap');

let accessToken = "";
let instanceUrl = "";

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'accounts.csv',
//    header: ['Id', 'Description', 'Name', 'Phone', 'Rating', 'AccountSource', 'Type', 'Snittomsetning__c', 'BillingCity', 'BillingCountry', 'BillingGeocodeAccuracy', 'BillingLatitude', 'BillingLongitude', 'BillingState', 'BillingStreet', 'BillingPostalCode', 'Birthdate__c', 'Company_Email__c', 'Customsolution__c', 'Jigsaw', 'PersonDepartment', 'PersonEmail', 'PersonEmailBouncedDate', 'PersonEmailBouncedReason', 'NumberOfEmployees', 'Fakturasplitt__c', 'i_customer__c', 'i_rep__c', 'Industry', 'Invoice_group__c', 'IPT__c', 'Ordrenummer_hovedavtale__c', 'PersonLeadSource', 'Lead_Source__c', 'PersonMailingCity', 'PersonMailingCountry', 'PersonMailingGeocodeAccuracy', 'PersonMailingLatitude', 'PersonMailingLongitude', 'PersonMailingState', 'PersonMailingStreet', 'PersonMailingPostalCode', 'PersonMobilePhone', 'Mobile__c', 'Org_nr__c', 'OwnerId', 'ParentId', 'Partner__c', 'Phone_2__c', 'ShippingCity', 'ShippingCountry', 'ShippingLatitude', 'ShippingLongitude', 'ShippingState', 'ShippingStreet', 'ShippingPostalCode', 'RecordTypeId', 'SamKom__c', 'ShippingGeocodeAccuracy', 'SicDesc', 'SuperOffice__c', 'PersonTitle', 'Vainu_link__c', 'Website']
});



function insert(records, start, batchamount) {

    let items = records.slice(start, batchamount);

    const conn2workbench = new jsforce.Connection({
        oauth2 : {
            // you can change loginUrl to connect to sandbox or prerelease env.
            loginUrl : process.env.SFLOGINURL,
            clientId : process.env.SFCLIENTID,
            clientSecret : process.env.SFCLIENTSECRET,
            redirectUri : process.env.SFREDIRECTURL,
            //proxyUrl: 'https://noodlesmiddleware.herokuapp.com/proxy/'
        }
    });
    conn2workbench.login(process.env.SFUSER, process.env.SFPASS, function(err, userInfo) {
                if (err) { return console.error(err); }
                
                console.log('\n');
                console.log('------------------------------------');
                console.log('-  Connection with SF SANDBOX ENV  -');
                console.log('------------------------------------'+'\n');


                accessToken = conn.accessToken;
                instanceUrl = conn.instanceUrl;

                // logged in user property
                console.log("accessToken : " + conn.accessToken);
                console.log("instanceUrl : " + conn.instanceUrl);
                console.log("User ID: " + userInfo.id);
                console.log("Org ID: " + userInfo.organizationId);

                process.env.ACCESSTOKEN = conn.accessToken;
                process.env.INSTANCEURL = conn.instanceUrl;
                
                

                var job = conn2workbench.bulk.createJob("Account", "insert");
                var batch = job.createBatch();

                batch.execute(items);
                // listen for events
                batch.on("error", function(batchInfo) { // fired when batch request is queued in server.
                    console.log('Error, batchInfo:', batchInfo);
                });
                batch.on("queue", function(batchInfo) { // fired when batch request is queued in server.
                    console.log('queue, batchInfo:', batchInfo);
                    batch.poll(1000 /* interval(ms) */, 20000 /* timeout(ms) */); // start polling - Do not poll until the batch has started
                });
                batch.on("response", function(rets) { // fired when batch finished and result retrieved
                    for (var i=0; i < rets.length; i++) {
                        if (rets[i].success) {
                            insert(records, start+batchamount, batchamount);
                            console.log("#" + (i+1) + " loaded successfully, id = " + rets[i].id);
                        } else {
                            console.log("#" + (i+1) + " error occurred, message = " + rets[i].errors.join(', '));
                        }
                    }
                });

            });
}


function conn() {
    const conn2production = new jsforce.Connection({
        oauth2 : {
            // you can change loginUrl to connect to sandbox or prerelease env.
            loginUrl : process.env.SFLOGINURL,
            clientId : process.env.SFCLIENTID,
            clientSecret : process.env.SFCLIENTSECRET,
            redirectUri : process.env.SFREDIRECTURL,
            //proxyUrl: 'https://noodlesmiddleware.herokuapp.com/proxy/'
        }
    });

    conn2production.login(process.env.SFUSER, process.env.SFPASS, function(err, userInfo) {
        if (err) { return console.error(err); }
        // Now you can get the access token and instance URL information.
        // Save them to establish connection next time.

        console.log('\n')
        console.log('---------------------------------------');
        console.log('-  Connection with SF PRODUCTION ENV  -');
        console.log('---------------------------------------'+'\n');

        accessToken = conn.accessToken;
        instanceUrl = conn.instanceUrl;

        // logged in user property
        console.log("accessToken : " + conn.accessToken);
        console.log("instanceUrl : " + conn.instanceUrl);
        console.log("User ID: " + userInfo.id);
        console.log("Org ID: " + userInfo.organizationId);

        process.env.ACCESSTOKEN = conn.accessToken;
        process.env.INSTANCEURL = conn.instanceUrl;

        // Batch create csv from main sf
        var records = [];
        var query = conn2production.query("SELECT Id, Description, Name, Phone, Rating, AccountSource, Type, Snittomsetning__c, BillingCity, BillingCountry, BillingGeocodeAccuracy, BillingLatitude, BillingLongitude, BillingState, BillingStreet, BillingPostalCode, Birthdate__c, Company_Email__c, Customsolution__c, Jigsaw, PersonDepartment, PersonEmail, PersonEmailBouncedDate, PersonEmailBouncedReason, NumberOfEmployees, Fakturasplitt__c, i_customer__c, i_rep__c, Industry, Invoice_group__c, IPT__c, Ordrenummer_hovedavtale__c, PersonLeadSource, Lead_Source__c, PersonMailingCity, PersonMailingCountry, PersonMailingGeocodeAccuracy, PersonMailingLatitude, PersonMailingLongitude, PersonMailingState, PersonMailingStreet, PersonMailingPostalCode, PersonMobilePhone, Mobile__c, Org_nr__c, OwnerId, ParentId, Partner__c, Phone_2__c, ShippingCity, ShippingCountry, ShippingLatitude, ShippingLongitude, ShippingState, ShippingStreet, ShippingPostalCode, RecordTypeId, SamKom__c, ShippingGeocodeAccuracy, SicDesc, SuperOffice__c, PersonTitle, Vainu_link__c, Website FROM Account") 
            .on("record", function(record) {
                records.push(record);
            })
            .on("end", function() {
                console.log("total in database : " + query.totalSize);
                console.log("total fetched : " + query.totalFetched);

                // create csv
                // csvWriter.writeRecords(records)       // returns a promise
                // .then(() => {
                //     console.log('csv creation Done');
                // });
                insert(records, 0, 200);
            })
            .on("error", function(err) {
                console.error(err);
            })
            .run({ autoFetch : true, maxFetch : 70000 });

        



        
        // CSV parser
        // fs.createReadStream('../eRatedata.csv')
        // .pipe(csv())
        // .on('data', (data) => results.push(data))
        // .on('end', () => {
        //     //console.log(results);

            

        //     conn2production.sobject("Account").update({ 
        //         i_customer__c : results.I_CUSTOMER,
        //         eRateID__c : results.CUSTOMER_NUMBER,
        //         Has_been_synced_with_eRate__c: results.BILLING_GROUP_NAME,
        //         // to do: CreditCheckPerformed, CreditcheckPassed, CreditcheckAmount
        //         }, function(err, ret) {
        //             if (err || !ret.success) { return console.error(err, ret); }
        //             console.log("Account with Org.nr. : " + message.sobject.AccountId.Org_nr__c + " and Name : " + message.sobject.AccountId.Name + " with eRateID : " + result.ACCOUNT.ID + 'Updated Successfully : ' + ret.id);
        //     });
        // });
        

        // conn2production.streaming.topic("AccountUpdates").subscribe(function(message) {

        //     console.log('\n' + 'New account update or creation event.' + '\n');

        //     console.log('Event Type : ' + message.event.type);
        //     console.log('Event Created : ' + message.event.createdDate);
        //     console.log('Object Id : ' + message.sobject.Id);
        //     console.log('Object : ' + JSON.stringify(message.sobject));


        //     if(message.sobject.eRateID != "")
        //     {
        //     account.signupCustomer(message.sobject);
        //     } else {
        //         console.log('No initial eRate account, waiting for opportunity to be signed -> contract creation -> account creation in eRate.');
        //     }

        // });

        // conn2production.streaming.topic("OpportunityUpdates").subscribe(function(message) {

        //     console.log('\n' + 'Opportunity update or creation event.' + '\n');

        //     console.log('Event Type : ' + message.event.type);
        //     console.log('Event Created : ' + message.event.createdDate);
        //     console.log('Object Id : ' + message.sobject.Id);
        //     console.log('Object : ' + JSON.stringify(message.sobject));

        //     if(message.sobject.status == "Draft" && message.sobject.StageName == "Closed" && message.sobject.Loss_Reason__c == "" && message.sobject.AccountId.eRateID == "")
        //     {
        //         let xml = contract.signupContract(message.sobject);
        //         let eRateID, CreditCheckPerformed, CreditcheckPassed, CreditcheckAmount;

                
        //         let url = 'http://example.com/wsdl?wsdl';
        //         let args = xml;
        //         // ie var args = {name: 'value'};
        //         soap.createClientAsync(url).then((client) => {
        //             return client.MyFunctionAsync(args);
        //         }).then((result) => {
        //             conn.sobject("Account").update({ 
        //                 Id : message.sobject.Id,
        //                 eRateID : result.ACCOUNT.ID,
        //                 Has_been_synced_with_eRate__c: true,
        //                 // to do: CreditCheckPerformed, CreditcheckPassed, CreditcheckAmount
        //                 }, function(err, ret) {
        //                     if (err || !ret.success) { return console.error(err, ret); }
        //                     console.log("Account with Org.nr. : " + message.sobject.AccountId.Org_nr__c + " and Name : " + message.sobject.AccountId.Name + " with eRateID : " + result.ACCOUNT.ID + 'Updated Successfully : ' + ret.id);
        //             });

        //         });
        //     }
        // });

        // conn2production.streaming.topic("MobileUserUpdates").subscribe(function(message) {

        //     console.log('\n' + 'New mobile user update or creation event.' +'\n');

        //     console.log('Event Type : ' + message.event.type);
        //     console.log('Event Created : ' + message.event.createdDate);
        //     console.log('Object Id : ' + message.sobject.Id);
        //     console.log('Object : ' + JSON.stringify(message.sobject));

            

        // });

        // conn2production.streaming.topic("SubscriptionsUpdates").subscribe(function(message) {

        //     console.log('\n' + 'New subscription update or creation event.' +'\n');

        //     console.log('Event Type : ' + message.event.type);
        //     console.log('Event Created : ' + message.event.createdDate);
        //     console.log('Object Id : ' + message.sobject.Id);
        //     console.log('Object : ' + JSON.stringify(message.sobject));



        // });

    });    
}

module.exports.conn = conn;