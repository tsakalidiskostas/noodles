


function signupCustomer(data) {
    let xml = `<?xml version="1.0" encoding="UTF-8"?><SOAP:Envelope xmlns:SOAP="http://schemas.xmlsoap.org/soap/envelope/">
        <SOAP:Header/>
        <SOAP:Body>
            <ns1:executeMethod xmlns:ns1="http://soap.CDRator.com/">
                <arg0>
                    <hookpointKey>SOAP_SIGNUP_CUSTOMER_NO_SUBSCRIPTION</hookpointKey>

                    <values xmlns:q1="http://soap.CDRator.com/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="q1:complexValueDTO">
                        <value xsi:type="q1:stringValueDTO">
                            <value>EN</value>
                            <key>LANGUAGE</key>
                        </value>
                        <value xsi:type="q1:stringValueDTO">
                            <value>phonectweb</value>
                            <key>OPERATOR</key>
                        </value>
                        <value xsi:type="q1:stringValueDTO">
                            <value>PHONECT</value>
                            <key>BRAND_KEY</key>
                        </value>
                        <key>CONTEXT</key>
                    </values>`

                    xml += `<values xmlns:q1="http://soap.CDRator.com/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="q1:stringValueDTO">
                        <value>1</value>
                        <key>ACCOUNT_TYPE</key>
                    </values>
                    <values xmlns:q1="http://soap.CDRator.com/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="q1:stringValueDTO">
                        <value>PHONECT_0</value>
                        <key>PRODUCT_CODE</key>
                    </values>`;
                    // NOTHING UNTIL HERE
                    // Company info
            xml += `<values xmlns:q1="http://soap.CDRator.com/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="q1:complexValueDTO">`
                xml += data.name ? `<value xsi:type="q1:stringValueDTO">
                            <value>`+data.name+`</value>
                            <key>COMPANY</key>
                        </value>` : "";
                xml += data.PersonMailingAddress.street ? `<value xsi:type="q1:stringValueDTO">
                            <value>`+data.PersonMailingAddress.city+`</value>
                            <key>STREET</key>
                        </value>` : "";
                xml += data.PersonMailingAddress.city ? `<value xsi:type="q1:stringValueDTO">
                            <value>`+data.PersonMailingAddress.city+`</value>
                            <key>CITY</key>
                        </value>` : "";
                xml += data.PersonMailingAddress.postalCode ? `<value xsi:type="q1:stringValueDTO">
                            <value>`+data.PersonMailingAddress.postalCode+`</value>
                            <key>ZIP</key>
                        </value>` : "";
                xml += data.Org_nr__c ? `<value xsi:type="q1:stringValueDTO">
                            <value>`+data.Org_nr__c+`</value>
                            <key>PERSONAL_ID</key>
                        </value>` : "";
                xml += data.Company_Email__c ? `<value xsi:type="q1:stringValueDTO">
                            <value>`+data.Company_Email__c+`</value>
                            <key>EMAIL</key>
                        </value>` : "";
                xml += `<key>USER</key>`;
            xml += `</values>`;
                    // Billing group no idea 
            xml += `<values xmlns:q1="http://soap.CDRator.com/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="q1:complexValueDTO">
                        <value xsi:type="q1:stringValueDTO">
                            <value>Y</value>
                            <key>ADD_BILLING_FEE</key>
                        </value>
                        <value xsi:type="q1:stringValueDTO">
                            <value>1</value>
                            <key>INVOICE_DELIVERY_TYPE_ID</key>
                        </value>
                        <key>BILLING_GROUP</key>
                    </values>`;
                    // Billing group info 
            xml += `<values xmlns:q1="http://soap.CDRator.com/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="q1:complexValueDTO">`;
                xml += data.Name ? `<value xsi:type="q1:stringValueDTO">
                            <value>`+data.Name+`</value>
                            <key>COMPANY</key>
                        </value>` : "";
                xml += data.BillingAddress.city ? `<value xsi:type="q1:stringValueDTO">
                            <value>`+data.BillingAddress.city+`</value>
                            <key>CITY</key>
                        </value>` : "";
                xml += data.BillingAddress.postalCode ? `<value xsi:type="q1:stringValueDTO">
                            <value>`+data.BillingAddress.postalCode+`</value>
                            <key>ZIP</key>
                        </value>` : "";
                xml += data.Org_nr__c ? `<value xsi:type="q1:stringValueDTO">
                            <value>`+data.Org_nr__c+`</value>
                            <key>PERSONAL_ID</key>
                        </value>` : "";
                xml += data.BillingAddress.street ? `<value xsi:type="q1:stringValueDTO">
                            <value>`+data.BillingAddress.street+`</value>
                            <key>STREET</key>
                        </value>` : "";
                xml += `<value xsi:type="q1:stringValueDTO">
                            <value>Faktura</value>
                            <key>FIRST_NAME</key>
                        </value>`;
                xml += `<value xsi:type="q1:stringValueDTO">
                            <value>mottaker</value>
                            <key>LAST_NAME</key>
                        </value>`;
                xml += data.Company_Email__c ? `<value xsi:type="q1:stringValueDTO">
                            <value>`+data.Company_Email__c+`</value>
                            <key>EMAIL</key>
                        </value>` : "";
                xml += `<key>BILLING_ADDRESS</key>`;
            xml +=`</values>

                </arg0>
            </ns1:executeMethod>
        </SOAP:Body>
    </SOAP:Envelope>`;

    console.log('\n' + ' \n' + 'xml : '+xml);

    // const args = {name: 'value'};
    // soap.createClient(soapurl, function(err, client) {
    //     client.MyFunction(args, function(err, result) {
    //         console.log(result);
    //     });
    // });

}

module.exports.signupCustomer = signupCustomer;