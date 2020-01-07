/*
Below is an integration flow on how to use Cashfree's payouts sdk. The sdk can be found at: https://github.com/cashfree/cashfree-sdk-nodejs
Please go through the payout docs here: https://docs.cashfree.com/docs/payout/guide/

The following script contains the following functionalities :
    1.Beneficiary.add() -> to add a  beneficiary.
    2.Beneficiary.GetDetails() -> to get the details of the added beneficiarry.
    3.Transfer.RequestTransfer() -> to create a payout transfer.
    4.Transfer.GetTransferStatus() -> to get payout transfer status.
*/

const cfSdk = require('cashfree-sdk');

const config = {
    Payouts:{
    ClientID: "your_client_id",
    ClientSecret: "your_client_secret",
    ENV: "TEST", 
    }
};

const handleResponse = (response) => {
    if(response.status === "ERROR"){
        throw {name: "handle response error", message: "error returned"};
    }
}

const {Payouts} = cfSdk;
const {Beneficiary, Transfers} = Payouts;

//main execution function
(
async () => {
    //below functional call does not work
    cfSdk.Init(config);
    Payouts.Init(config.Payouts);
    //Beneficiary Addition
    try{
        const response = await Beneficiary.Add({
            "beneId": "JOHN180124", 
            "name": "john doe",
            "email": "johndoe@cashfree.com", 
            "phone": "9876543210", 
            "bankAccount": "00011020001772", 
            "ifsc": "HDFC0000001", 
            "address1" : "ABC Street", 
            "city": "Bangalore", 
            "state":"Karnataka", 
            "pincode": "560001"
        });
        console.log("beneficiarry addition response");
        console.log(response);
        handleResponse(response);
    }
    catch(err){
        console.log("err caught in beneficiarry addition");
        console.log(err);
        return;
    }
    //Get Beneficiary details
    try{
        const response = await Beneficiary.GetDetails({
            "beneId": "JOHN180124",
        });
        console.log("get beneficiary details response");
        console.log(response);
        handleResponse(response);
    }
    catch(err){
        console.log("err caught in getting beneficiary details");
        console.log(err);
        return;
    }
    //Request transfer
    try{
        const response = await Transfers.RequestTransfer({
            "beneId": "JOHN180124",
            "transferId": "tranfer001234",
            "amount": "1.00",
        });
        console.log("request transfer response");
        console.log(response);
        handleResponse(response);
    }
    catch(err){
        console.log("err caught in requesting transfer");
        console.log(err);
        return; 
    }
    //Get transfer status
    try{
        const response = await Transfers.GetTransferStatus({
            "transferId": "tranfer001234",
        });
        console.log("get transfer status response");
        console.log(response);
        handleResponse(response);
    }
    catch(err){
        console.log("err caught in getting transfer status");
        console.log(err);
        return; 
    }
}
)();
