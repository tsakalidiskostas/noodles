//import mapping from '../MAPPING/account'

function signupSubscription(data) {

let xml = `<?xml version="1.0" encoding="UTF-8"?>
  <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <SOAP-ENV:Body>
      <executeMethod xmlns="http://soap.CDRator.com/">
        <arg0 xmlns="">
          <hookpointKey>SOAP_SIGNUP_SUBSCRIPTION</hookpointKey>
          <values xsi:type="ns1:complexValueDTO" xmlns:ns1="http://soap.CDRator.com/">
            <value xsi:type="ns1:stringValueDTO">
              <value>EN</value>
              <key>LANGUAGE</key>
            </value>
            <value xsi:type="ns1:stringValueDTO">
              <value>phonectpos</value>
              <key>OPERATOR</key>
            </value>
            <value xsi:type="ns1:stringValueDTO">
              <value>PHONECT</value>
              <key>BRAND_KEY</key>
            </value>
            <key>CONTEXT</key>
          </values>`;

          xml += `<values xsi:type="ns1:complexValueDTO" xmlns:ns1="http://soap.CDRator.com/">`;
            xml += data.Billing_Group__c ? `<value xsi:type="ns1:stringValueDTO">
              <value>`+data.Billing_Group__c+`</value>
              <key>BILLING_GROUP_ID</key>
            </value>` : "";
            xml += data.MobileUser__c ? `<value xsi:type="ns1:stringValueDTO">
              <value>`+data.MobileUser__c.Id+`</value>
              <key>OWNER_ID</key>
            </value>` : "";
            xml += data.Company_Email__c ? `<value xsi:type="ns1:stringValueDTO">
              <value>PHONECT_0</value>
              <key>PRODUCT_CODE</key>
            </value>` : "";
            xml += data.Company_Email__c ? `<value xsi:type="ns1:stringValueDTO">
              <value>96003804</value>
              <key>MSISDN</key>
            </value>` : "";
            xml += data.Company_Email__c ? `<value xsi:type="ns1:stringValueDTO">
              <value>201911121002399346</value>
              <key>RESERVATION_ID</key>
            </value>` : "";
            xml += `<value xsi:type="ns1:stringValueDTO">
              <value>Phonect</value>
              <key>SHOP_ID</key>
            </value>`;
            xml += `<value xsi:type="ns1:stringValueDTO">
              <value>hfo</value>
              <key>OPERATOR_ID</key>
            </value>`;
            xml += `<key>SIGNUP_INFO</key>
          </values>`;

          xml += `<values xsi:type="ns1:complexValueDTO" xmlns:ns1="http://soap.CDRator.com/">`;
            xml += (data.Company_Email__c ? `<value xsi:type="ns1:complexValueDTO">
              <value xsi:type="ns1:stringValueDTO">
                <value>200406071752021850</value>
                <key>ID</key>
              </value>
              <key>PRODUCT_OPTION</key>
            </value>` : "";
            xml += (data.Company_Email__c ? `<value xsi:type="ns1:complexValueDTO">
              <value xsi:type="ns1:stringValueDTO">
                <value>201602021517555956</value>
                <key>ID</key>
              </value>
              <key>PRODUCT_OPTION</key>
            </value>` : "";
            xml += (data.Company_Email__c ? `<value xsi:type="ns1:complexValueDTO">
              <value xsi:type="ns1:stringValueDTO">
                <value>201908290758439909</value>
                <key>ID</key>
              </value>
              <key>PRODUCT_OPTION</key>
            </value>` : "";
            xml += `<key>PRODUCT_OPTIONS</key>
          </values>`;

          xml += `<values xsi:type="ns1:stringValueDTO" xmlns:ns1="http://soap.CDRator.com/">
            <value>TELENOR_OLD_HANDLER</value>
            <key>CUSTOM_SIM_HANDLE</key>
          </values>
        </arg0>
      </executeMethod>
    </SOAP-ENV:Body>
  </SOAP-ENV:Envelope>`;




}

module.exports.signupSubscription = signupSubscription;