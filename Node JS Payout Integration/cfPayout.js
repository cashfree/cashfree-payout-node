
  
class cashfreeUser{


    constructor()
    {
          this.clientId;
          this.jsonresponse;
          this.clientSecret;
          this.token;
          this.expiry;
    }
  
   

    clientAuth(clientId,clientSecret,stage)
    
    {

        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.stage = stage;
        var linkAuthorize;
        
        if (stage == "TEST")
        {
            linkAuthorize = "https://payout­-gamma.cashfree.com//payout/v1/authorize";
        }
        else if (stage == "PROD")
        {
            linkAuthorize = "https://payout­-api.cashfree.com//payout/v1/authorize";
        }

        var request = require('sync-request')
        
        this.jsonresponse = request("POST","https://payout­-gamma.cashfree.com//payout/v1/authorize", { 
            headers:
            {
            'content-type':'application/json',
            'X-Client-Id' : clientId,
            'X-Client-Secret' : clientSecret
            }
        });
        var data = this.jsonresponse.body.toString('utf-8');
        data = JSON.parse(data);
        if (data["status"] == "ERROR"){
            return data["message"].toString();
        }
        this.expiry = data["data"]["expiry"];
        this.token = data["data"]["token"];

    return this.token;}


    expiryCheck()
    {   

        var expirytime = this.expiry;
        var currenttime = ((new Date).getTime())/1000;
        //checks if the token will expire in the next minute and generates a new one 
        if (expirytime - currenttime <= 60){
            var temp = new cashfreeUser;
            return temp.clientAuth(this.clientId,this.clientSecret,this.stage);
        }

        else
        {
            return null;
        }
    }

    addBeneficiary(beneId, name, email, phone, bankAccount, ifsc, address1,address2,vpa, city, state, pincode)
    {

        if ((beneId == null) || (name == null) || (email == null) || ( phone == null) || ( address1 == null))
        {
            return "Mandatory paramters missing";
        }
        else
        {
            var userParam = {   
                "beneId" : beneId,
                "name" : name,
                "email" : email ,
                "phone" : phone,
                "bankAccount" : bankAccount, //optional
                "ifsc" : ifsc, //ptional
                "vpa" : vpa,
                "address1" : address1,               
                "address2" : address2, //optional
                "city" : city, //optional
                "state" : state, //optional
                "pincode" : pincode //optional
                }
            
            var temp = new cashfreeUser; 
            temp.expiryCheck();
            var token = this.token;
            var linkAddBeneficiary;
            if (this.stage == "TEST"){
                linkAddBeneficiary  = "https://payout­-gamma.cashfree.com/payout/v1/addBeneficiary";
            }
            else if (  this.stage == "PROD"){
            linkAddBeneficiary  = "https://payout­-api.cashfree.com/payout/v1/addBeneficiary";
            }

            var headers = {
                'Content-Type': "application/json",
                'Authorization': "Bearer " +  token
                }
            
                
            var request = require('sync-request')
            this.jsonresponse = request("POST",linkAddBeneficiary, {
                json : userParam,
               headers: headers,
            });
            var data = this.jsonresponse.body.toString('utf-8');
            data = JSON.parse(data);

            return data;    

        }

    }

    getBalance()
    {
        var token = this.token;

        var header = {
            'Authorization' : "Bearer " + token
        }
        var temp = new cashfreeUser; 
        temp.expiryCheck();
        var linkGetBalance;
        if (this.stage == "TEST"){
            linkGetBalance = "https://payout-gamma.cashfree.com/payout/v1/getBalance";}

        else if  (  this.stage == "PROD"){
            linkGetBalance = "https://payout-api.cashfree.com/payout/v1/getBalance";}
        
        
        var request = require('sync-request')
        this.jsonresponse = request("GET",linkGetBalance, {
            headers: header,
        });
        var data = this.jsonresponse.body.toString('utf-8');
        data = JSON.parse(data);

        return data;    
    }

    requestTransfer(beneId, amount, transferId, transferMode, remarks)
    {
        if ((beneId == null) || (amount == null) || (transferId == null) )
        {
            return "Mandatory paramters missing";
        }
        else
        {
            var userRequestParam = {
                "beneId" : beneId,
                "amount" : amount, 
                "transferId" : transferId,
                "transferMode" : transferMode, //optional
                "remarks" : remarks //optional
            }
            var token = this.token;

            var temp = new cashfreeUser; 
            temp.expiryCheck();

            var headers = {
                'Authorization': "Bearer " +  token
            }
            var linkRequestTransfer; 
            if (this.stage == "TEST"){
                linkRequestTransfer = "https://payout-gamma.cashfree.com/payout/v1/requestTransfer";}

            else if (  this.stage == "PROD"){
                linkRequestTransfer = "https://payout-api.cashfree.com/payout/v1/requestTransfer";}
           
            var request = require('sync-request')
            this.jsonresponse = request("POST",linkRequestTransfer, {
                headers: headers,
                json : userRequestParam
            });
            var data = this.jsonresponse.body.toString('utf-8');
            data = JSON.parse(data);
    
            return data;   
        }

    }

    getTransferStatus(transferId)
    {
        if (transferId == null){
            return "Mandatory paramters missing";
        }
        else{
            var token = this.token;
            var temp = new cashfreeUser; 
            temp.expiryCheck();
            var headers = {
                'Authorization': "Bearer " +  token,
                'transferId' : transferId
            }
            var linkTransferStatus;
            if (this.stage == "TEST"){
            linkTransferStatus = "https://payout-gamma.cashfree.com/payout/v1/getTransferStatus" + "?transferId="+transferId;}
            else if (  this.stage == "PROD"){
            linkTransferStatus = "https://payout-api.cashfree.com/payout/v1/getTransferStatus" + "?transferId="+transferId;}
            
            var request = require('sync-request')
            this.jsonresponse = request("GET",linkTransferStatus, {
                headers: headers,
            });
            var data = this.jsonresponse.body.toString('utf-8');
            data = JSON.parse(data);
    
            return data;   

        }
    }

    bankDetailsValidation(name, phone, bankAccount,ifsc)
    {
        if ((name == null) || (phone == null) || (bankAccount == null) || ( ifsc == null))
        {
            return "Mandatory paramters missing";
        }
        else
        {
            var token = this.token;
            var temp = new cashfreeUser; 
            temp.expiryCheck();
            var headers = {
                'Authorization': "Bearer " +  token,
                'name' : name,
                'phone' : phone,
                'bankAccount' : bankAccount,
                'ifsc' : ifsc
            }
            var linkBankValidation;
            if (this.stage == "TEST"){
                linkBankValidation = "https://payout-gamma.cashfree.com/payout/v1/validation/bankDetails" + "?name=" + name + "&phone=" + phone + "&bankAccount=" + bankAccount + "&ifsc=" + ifsc;}
        
            else if (  this.stage == "PROD"){
                linkBankValidation = "https://payout-api.cashfree.com/payout/v1/validation/bankDetails" + "?name=" + name + "&phone=" + phone + "&bankAccount=" + bankAccount + "&ifsc=" +ifsc;}
            
            var request = require('sync-request')
            this.jsonresponse = request("GET",linkBankValidation, {
                headers: headers,
            });
            var data = this.jsonresponse.body.toString('utf-8');
            data = JSON.parse(data);
    
            return data;   

        }

    }

}
module.exports = cashfreeUser;

