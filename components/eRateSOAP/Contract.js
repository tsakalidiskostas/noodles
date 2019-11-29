

function signupContract(data) {
    // create the sceleton xml
    let xml = {
        CONTEXT : {
            LANGUAGE : "EN",
            BRAND_KEY : "PHONECT",
            OPERATOR : "phonectweb"
        },
        ACCOUNT_TYPE : "1",
        PRODUCT_CODE : "PHONECT_0",
        USER : {},
        BILLING_GROUP : {},
        BILLING_ADDRESS : {},
    }
    // add the data:

    // Company info
    if(typeof data.AccountId.Name != "undefined" && data.AccountId.Name != "") {                                        xml.USER.COMPANY = data.AccountId.Name;    }
    if(typeof data.AccountId.ShippingAddress.street != "undefined" && data.AccountId.ShippingAddress.street != "") {    xml.USER.STREET = data.AccountId.ShippingAddress.street;    }
    if(typeof data.AccountId.ShippingAddress.city != "undefined" && data.AccountId.ShippingAddress.city != "") {        xml.USER.CITY = data.AccountId.ShippingAddress.city;    }
    if(typeof data.AccountId.ShippingAddress.postalCode != "undefined" && data.AccountId.ShippingAddress.postalCode != "") { xml.USER.ZIP = data.AccountId.ShippingAddress.postalCode;    }
    if(typeof data.AccountId.Org_nr__c != "undefined" && data.AccountId.Org_nr__c != "") {                              xml.USER.PERSONAL_ID = data.AccountId.Org_nr__c;    }
    if(typeof data.AccountId.Company_Email__c != "undefined" && data.AccountId.Org_nr__c != "") {                       xml.USER.EMAIL = data.AccountId.Company_Email__c;    }

    // Billing group - recheck later
    if(typeof data.Invoicing_method__c != "undefined" && data.Invoicing_method__c != "") {
        var methods = data.Invoicing_method__c.split(',');
        var a = "";
        // ASK Roy if a multiselect is possible
        for(var b = 0; b <= methods; b++) {
            if(methods[b] == "Email") { a += "1"; }
            else if(methods[b] == "Postal") { a += "2"; }
            else if(methods[b] == "EHF") { a += "3"; }
            a += ","
        }
                                                                                                                        xml.BILLING_GROUP.INVOICE_DELIVERY_TYPE_ID = a;
    } else {
                                                                                                                        xml.BILLING_GROUP.INVOICE_DELIVERY_TYPE_ID = "1";
    }
    if(typeof data.Add_billing_fee__c != "undefined" && data.Add_billing_fee__c != "") {                                xml.BILLING_GROUP.ADD_BILLING_FEE = (data.Add_billing_fee__c == true) ? "Y" : "N";   }

    // Billing address info
    if(typeof data.AccountId.Name != "undefined" && data.AccountId.Name != "") {                                        xml.BILLING_ADDRESS.COMPANY = data.AccountId.Name;}
    if(typeof data.AccountId.BillingAddress.city != "undefined" && data.AccountId.BillingAddress.city != "") {          xml.BILLING_ADDRESS.CITY = data.AccountId.BillingAddress.city;}
    if(typeof data.AccountId.BillingAddress.postalCode != "undefined" && data.AccountId.BillingAddress.postalCode != "") { xml.BILLING_ADDRESS.ZIP = data.AccountId.BillingAddress.postalCode;}
    if(typeof data.AccountId.Org_nr__c != "undefined" && data.AccountId.Org_nr__c != "") {                              xml.BILLING_ADDRESS.PERSONAL_ID = data.AccountId.Org_nr__c;}
    if(typeof data.AccountId.BillingAddress.street != "undefined" && data.AccountId.BillingAddress.street != "") {                          xml.BILLING_ADDRESS.STREET = data.AccountId.BillingAddress.street;}
                                                                                                                        // Note: Could use CompanySignedId, but I am not sure, so Faktura mottaker will do for now.
                                                                                                                        xml.BILLING_ADDRESS.FIRST_NAME = "Faktura";
                                                                                                                        xml.BILLING_ADDRESS.LAST_NAME = "mottaker";
    if(typeof data.Billing_email__c != "undefined" && data.Billing_email__c != "") {                                    xml.BILLING_ADDRESS.COMPANY = data.Billing_email__c;} else 
                                                                                                                 {      xml.BILLING_ADDRESS.COMPANY = data.AccountId.Company_Email__c;}
    console.log('\n' + ' \n' + 'xml : '+xml);
    return xml;
}



// function signupContract2(data) {
//     let xml = `<?xml version="1.0" encoding="UTF-8"?><SOAP:Envelope xmlns:SOAP="http://schemas.xmlsoap.org/soap/envelope/">
//         <SOAP:Header/>
//         <SOAP:Body>
//             <ns1:executeMethod xmlns:ns1="http://soap.CDRator.com/">
//                 <arg0>
//                     <hookpointKey>SOAP_SIGNUP_CUSTOMER_NO_SUBSCRIPTION</hookpointKey>

//                     <values xmlns:q1="http://soap.CDRator.com/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="q1:complexValueDTO">
//                         <value xsi:type="q1:stringValueDTO">
//                             <value>EN</value>
//                             <key>LANGUAGE</key>
//                         </value>
//                         <value xsi:type="q1:stringValueDTO">
//                             <value>phonectweb</value>
//                             <key>OPERATOR</key>
//                         </value>
//                         <value xsi:type="q1:stringValueDTO">
//                             <value>PHONECT</value>
//                             <key>BRAND_KEY</key>
//                         </value>
//                         <key>CONTEXT</key>
//                     </values>`

//                     xml += `<values xmlns:q1="http://soap.CDRator.com/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="q1:stringValueDTO">
//                         <value>1</value>
//                         <key>ACCOUNT_TYPE</key>
//                     </values>
//                     <values xmlns:q1="http://soap.CDRator.com/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="q1:stringValueDTO">
//                         <value>PHONECT_0</value>
//                         <key>PRODUCT_CODE</key>
//                     </values>`;
//                     // NOTHING UNTIL HERE
//                     // Company info
//             xml += `<values xmlns:q1="http://soap.CDRator.com/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="q1:complexValueDTO">`
//                 xml += data.AccountId.name ? `<value xsi:type="q1:stringValueDTO">
//                             <value>`+data.AccountId.name+`</value>
//                             <key>COMPANY</key>
//                         </value>` : "";
//                 xml += data.ShippingAddress.street ? `<value xsi:type="q1:stringValueDTO">
//                             <value>`+data.ShippingAddress.city+`</value>
//                             <key>STREET</key>
//                         </value>` : "";
//                 xml += data.ShippingAddress.city ? `<value xsi:type="q1:stringValueDTO">
//                             <value>`+data.ShippingAddress.city+`</value>
//                             <key>CITY</key>
//                         </value>` : "";
//                 xml += data.ShippingAddress.postalCode ? `<value xsi:type="q1:stringValueDTO">
//                             <value>`+data.ShippingAddress.postalCode+`</value>
//                             <key>ZIP</key>
//                         </value>` : "";
//                 xml += data.AccountId.Org_nr__c ? `<value xsi:type="q1:stringValueDTO">
//                             <value>`+data.AccountId.Org_nr__c+`</value>
//                             <key>PERSONAL_ID</key>
//                         </value>` : "";
//                 xml += data.AccountId.Company_Email__c ? `<value xsi:type="q1:stringValueDTO">
//                             <value>`+data.AccountId.Company_Email__c+`</value>
//                             <key>EMAIL</key>
//                         </value>` : "";
//                 xml += `<key>USER</key>`;
//             xml += `</values>`;
//                     // Billing group no idea 
//             xml += `<values xmlns:q1="http://soap.CDRator.com/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="q1:complexValueDTO">
//                         <value xsi:type="q1:stringValueDTO">
//                             <value>Y</value>
//                             <key>ADD_BILLING_FEE</key>
//                         </value>
//                         <value xsi:type="q1:stringValueDTO">
//                             <value>1</value>
//                             <key>INVOICE_DELIVERY_TYPE_ID</key>
//                         </value>
//                         <key>BILLING_GROUP</key>
//                     </values>`;
//                     // Billing group info 
//             xml += `<values xmlns:q1="http://soap.CDRator.com/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="q1:complexValueDTO">`;
//                 xml += data.AccountId.Name ? `<value xsi:type="q1:stringValueDTO">
//                             <value>`+data.AccountId.Name+`</value>
//                             <key>COMPANY</key>
//                         </value>` : "";
//                 xml += data.BillingAddress.city ? `<value xsi:type="q1:stringValueDTO">
//                             <value>`+data.BillingAddress.city+`</value>
//                             <key>CITY</key>
//                         </value>` : "";
//                 xml += data.BillingAddress.postalCode ? `<value xsi:type="q1:stringValueDTO">
//                             <value>`+data.BillingAddress.postalCode+`</value>
//                             <key>ZIP</key>
//                         </value>` : "";
//                 xml += data.AccountId.Org_nr__c ? `<value xsi:type="q1:stringValueDTO">
//                             <value>`+data.AccountId.Org_nr__c+`</value>
//                             <key>PERSONAL_ID</key>
//                         </value>` : "";
//                 xml += data.BillingAddress.street ? `<value xsi:type="q1:stringValueDTO">
//                             <value>`+data.BillingAddress.street+`</value>
//                             <key>STREET</key>
//                         </value>` : "";
//                         // Note: Could use CompanySignedId, but I am not sure, so Faktura mottaker will do for now. 
//                 xml += `<value xsi:type="q1:stringValueDTO">
//                             <value>Faktura</value>
//                             <key>FIRST_NAME</key>
//                         </value>`;
//                 xml += `<value xsi:type="q1:stringValueDTO">
//                             <value>mottaker</value>
//                             <key>LAST_NAME</key>
//                         </value>`;
//                 xml += data.Opportunity__r.Billing_email__c ? `<value xsi:type="q1:stringValueDTO">
//                             <value>`+data.Opportunity__r.Billing_email__c+`</value>
//                             <key>EMAIL</key>
//                         </value>` : `<value xsi:type="q1:stringValueDTO">
//                             <value>`+data.AccountId.Company_Email__c+`</value>
//                             <key>EMAIL</key>
//                         </value>`;
//                 xml += `<key>BILLING_ADDRESS</key>`;
//             xml +=`</values>

//                 </arg0>
//             </ns1:executeMethod>
//         </SOAP:Body>
//     </SOAP:Envelope>`;

//     console.log('\n' + ' \n' + 'xml : '+xml);

//     return xml;
// }

module.exports.signupContract = signupContract;