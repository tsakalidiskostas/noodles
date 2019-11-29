function signupMobileUser(data) {
        let xml = `<?xml version="1.0" encoding="UTF-8"?><SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <SOAP-ENV:Header/>
            <SOAP-ENV:Body>
                <executeMethod xmlns="http://soap.CDRator.com/">
                    <arg0 xmlns="">
                        <hookpointKey>SOAP_CREATE_USER</hookpointKey>
                        <values xmlns:ns1="http://soap.CDRator.com/" xsi:type="ns1:complexValueDTO">
                            <value xsi:type="ns1:stringValueDTO">
                                <value>EN</value>
                                <key>LANGUAGE</key>
                            </value>
                            <value xsi:type="ns1:stringValueDTO">
                                <value>phonectweb</value>
                                <key>OPERATOR</key>
                            </value>
                            <value xsi:type="ns1:stringValueDTO">
                                <value>PHONECT</value>
                                <key>BRAND_KEY</key>
                            </value>
                            <key>CONTEXT</key>
                        </values>`;
                        xml += `<values xmlns:ns1="http://soap.CDRator.com/" xsi:type="ns1:stringValueDTO">`;
                            xml += (data.Account__c.AccountId =! "") ? `<value>`+data.Account__c.AccountId+`</value>
                            <key>ACCOUNT_ID</key>
                        </values>` : "";
                        xml += `<values xmlns:ns1="http://soap.CDRator.com/" xsi:type="ns1:complexValueDTO">`;
                            xml += (data.FirstName__c =! "") ? `<value xsi:type="ns1:stringValueDTO">
                                <value>`+data.FirstName__c+`</value>
                                <key>FIRST_NAME</key>
                            </value>` : "";
                            xml += (data.LastName__c =! "") ? `<value xsi:type="ns1:stringValueDTO">
                                <value>`+data.LastName__c+`</value>
                                <key>LAST_NAME</key>
                            </value>` : "";
                            xml += (data.Email__c =! "") ? `<value xsi:type="ns1:stringValueDTO">
                                <value>`+data.Email__c+`</value>
                                <key>EMAIL</key>
                            </value>` : "";
                            xml += `<key>USER</key>
                        </values>
                    </arg0>
                </executeMethod>
            </SOAP-ENV:Body>
        </SOAP-ENV:Envelope>`;
    }

}


module.exports.signupMobileUser = signupMobileUser;