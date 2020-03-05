/*
Below is an integration flow on how to use Cashfree's payouts sdk. The sdk can be found at: https://github.com/cashfree/cashfree-sdk-nodejs
Please go through the payout docs here: https://dev.cashfree.com/payouts

The following script contains the following functionalities :
    1.Beneficiary.add() -> to add a  beneficiary.
    2.Beneficiary.GetDetails() -> to get the details of the added beneficiary.
    3.Transfers.RequestTransfer() -> to create a payout transfer.
    4.Transfers.GetTransferStatus() -> to get payout transfer status.
*/

const cfSdk = require('cashfree-sdk');

const config = {
    Payouts:{
    ClientID: "client_id",
    ClientSecret: "client_secret",
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
const bene = {
    "beneId": "JOHN1801277890990877", 
    "name": "john doe",
    "email": "johndoe@cashfree.com", 
    "phone": "9876543210",
    "bankAccount": "00011020001772",
    "ifsc": "HDFC0000001",    
    "address1" : "ABC Street", 
    "city": "Bangalore", 
    "state":"Karnataka", 
    "pincode": "560001"
};

const transfer = {
    beneId: bene.beneId,
    transferId: "tranfer0012341239936",
    amount: "1.00",
};

(
async () => {
    Payouts.Init(config.Payouts);
    let addBene = false;
    //Get Beneficiary details
    try{
        const response = await Beneficiary.GetDetails({
            "beneId": bene.beneId,
        });
        console.log("get beneficiary details response");
        console.log(response);
        if(response.status === 'ERROR' && response.subCode === '404' && response.message === 'Beneficiary does not exist'){
            addBene = true;
        }
        else{
            handleResponse(response);
        }
    }
    catch(err){
        console.log("err caught in getting beneficiary details");
        console.log(err);
        return;
    }
    if(addBene){
        //Beneficiary Addition
        try{
            const response = await Beneficiary.Add(bene);
            console.log("beneficiarry addition response");
            console.log(response);
            handleResponse(response);
        }
        catch(err){
            console.log("err caught in beneficiarry addition");
            console.log(err);
            return;
        }
    }
    //Request transfer
    try{
        const response = await Transfers.RequestTransfer(transfer);
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
            "transferId": transfer.transferId,
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
