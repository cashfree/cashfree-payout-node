/*
Below is an integration flow on how to use Cashfree's payouts.
Please go through the payout docs here: https://docs.cashfree.com/docs/payout/guide/

The following script contains the following functionalities :
    1.getToken() -> to get auth token to be used in all following calls.
    2.getBeneficiary() -> to get beneficiary details/check if a beneficiary exists
    3.createBeneficiaryEntity() -> to create beneficiaries
    4.requestTransfer() -> to create a payout transfer
    5.getTransferStatus() -> to get payout transfer status.


All the data used by the script can be found in the config.json file. This includes the clientId, clientSecret, Beneficiary object, Transaction Object.
You can change keep changing the values in the config file and running the script.
Please enter your clientId and clientSecret, along with the appropriate enviornment, beneficiary details and request details
*/

/**
 * Please note that this script has a dependency on the request library.
 */



const util = require('util');
const request = require('request');

const postAsync = util.promisify(request.post);
const getAsync = util.promisify(request.get);

const config = require('./config.json');

const {env, url, clientId, clientSecret} = config;
const baseUrl = config["baseUrl"][env];
const headers = {
    "X-Client-Id": clientId,
    "X-Client-Secret": clientSecret
}

//helper function to create the options that will be passed to the https/request library
function createOptions(action, headers, json){
    const finalUrl = baseUrl + url[action];
    json = json? json: {};
    return {url: finalUrl, headers, json};
}


//helper function to create headers
function createHeader(token){
    return {...headers, 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token};
}

//function to get the authentication token
//token is alive for 5 mins
async function getToken(){
    try{
        const r = await postAsync(createOptions('auth', headers));
        const {status, subCode, message} = r.body;
        if(status !== 'SUCCESS' || subCode !== '200') throw {name: "incorectResponseError", message: "incorrect response recieved: " + message};
        const {data: {token}} = r.body;
        return token;
    }
    catch(err){
        console.log("err in getting token");
        throw err;
    }
}

//function to get beneficiary
async function getBeneficiary(token){
    try{
        const {beneDetails: {beneId}} = config;
        if(!beneId) throw {name: "validationError", message:"beneId missing"};
        finalUrl = baseUrl + url["getBene"] + beneId;
        const r = await getAsync(finalUrl,{headers: createHeader(token)});
        const {status, subCode} = JSON.parse(r.body);
        if(status === 'SUCCESS' && subCode === '200') return true;
        return false;
    }
    catch(err){
        console.log("err in getting beneficiary");
        throw err;
    }
}

//function to create beneficiary
async function createBeneficiaryEntity(token){
    try {
        const {beneDetails} = config;
        if(!beneDetails) throw {name: "validationError", message:"BeneDetails missing"};
        const r = await postAsync(createOptions('addBene', createHeader(token) ,beneDetails));
        const {status, subCode, message} = r.body;
        if(status !== 'SUCCESS' || subCode !== '200') throw {name: "incorectResponseError", message: "incorrect response recieved: " + message};
    } catch (err) {
        console.log("err in creating beneficiary");
        throw err;
    }
}

//function to request transfer
async function requestTransfer(token){
    try {
        const {transferDetails} = config;
        if(!transferDetails) throw {name: "validationError", message:"transferDetails missing"};
        const r = await postAsync(createOptions('requestTransfer', createHeader(token) ,transferDetails));
        const {status, subCode, message} = r.body;
        if(status !== 'SUCCESS' || subCode !== '200') throw {name: "incorectResponseError", message: "incorrect response recieved: " + message};
    } catch (err) {
        console.log("err in requesting payment");
        throw err;
    }
}

//function to get transfer status
async function getTransferStatus(token){
    try{
        const {transferDetails: {transferId}} = config;
        const finalUrl = baseUrl + url["getTransferStatus"] + transferId;
        const r = await getAsync(finalUrl, {headers: createHeader(token)});
        const {status, subCode, message} = JSON.parse(r.body);
        if(status !== 'SUCCESS' || subCode !== '200') throw {name: "incorectResponseError", message: "incorrect response recieved: " + message};
        console.log(JSON.parse(r.body));
    } catch(err) {
        console.log("err in getting transfer status");
        throw err;
    }
}

/*
The flow executed below is:
1. fetching the auth token
2. checking if beneficary exists.
3. If beneficiary does not exist, create a new beneficiary
4. requesting a transfer
5. checking the status of a transfer.
*/
(
    async () => {
        try{
            const token = await getToken();
            if(!(await getBeneficiary(token))) await createBeneficiaryEntity(token);
            await requestTransfer(token);
            await getTransferStatus(token);
            console.log("request processed sucessfully");
        }catch(err){
            console.log("main err caught");
            console.log(err);
        }
    }
)();


