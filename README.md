# Cashfree Payout Integration Kit for Node

Below is an integration flow on how to use Cashfree's payouts sdk.
Please go through the payout docs [here](https://docs.cashfree.com/docs/payout/guide/)
<br/>
This kit is linked to the standard transfer flow. Go [here](https://dev.cashfree.com/payouts/integrations/standard-transfer) to get a better understanding.
<br/>

## Functionalities

The following kit contains the following functionalities:
    <ol>
    <li> init: initialise the payout sdk.
    <li> Beneficiary.Add: to get beneficiary details/check if a beneficiary exists.
    <li> Beneficiary.GetDetails: to create beneficiaries.
    <li> Transfers.RequestTransfer: to create a payout transfer.
    <li> Transfers.GetTransferStatus: to get payout transfer status.
    </ol>

## Build Steps

follow the following build steps to compile the Integration kit:
  1. Download the code and cd into the directory containing the code.
  2. run the following from the command line to install all the dependencies.
  ```
  npm install
  ```
## Set Up

### Pre Requisites:
The following kit uses information stored in the app.js. Before running the code for the first time open the config.json file
and add the relevant details:
  1. ClientId: This is a unique Identifier that identifies the merchant. For more information please go [here](https://dev.cashfree.com/payouts/integrations/pre-requisites#credentials).
  2. ClientSecret: Corresponding secret key for the given ClientId that helps Cashfree indentify the merchant. For more information please go [here](https://dev.cashfree.com/payouts/integrations/pre-requisites#credentials).
  3. Environment: Enviornment to be hit. The following values are accepted prod: for production, test: for test enviornment.

### IP Whitelisting:

Your IP has to be whitelisted to hit Cashfree's server. For more information please go [here](https://dev.cashfree.com/payouts/integrations/pre-requisites#ip).

### Beneficiary:
The following kit needs beneficiary details in order to check if the beneficary exists and if it does not exist, 
create a beneficiary for the payout transfer. For more information on Beneficiaries please go [here](https://dev.cashfree.com/payouts/integrations/standard-transfer#beneficiary)

The kit reads beneficary details from the app.js file. Under the object passed to the Beneficiary.add function. For a list of required fields go [here](https://dev.cashfree.com/api-reference/payouts-api#create-beneficiary).
Sample Fields to add a beneficiary using bankAccount and ifsc:
  1. beneId: uniqueId of the created beneficiary.
  2. name: beneficiary name.
  3. email: beneficiary email.
  4. phone: beneficiary phone.
  5. bankAccount: beneficary's bank account.
  6. ifsc: corresponding ifsc.
  7. address1: beneficiary address.
  8. city: beneficiary city.
  9. state: beneficiary state.
  10. pincode: beneficiary pincode.
  
### transferDetails:
To request a payout transfer certain information is needed. To get a better understanding on requesting a transfer go [here](https://dev.cashfree.com/api-reference/payouts-api#standard-transfer).

Required Fields are:
  1. beneId: beneficiaryId to whom the transfer must be made to.
  2. amount: amount to be transferred.
  3. trasnferId: unique transfer id to indentify the transfer.


## Usage

Once the app.js file is setup you can run the executable, to run the entire flow. Authorise, check and add beneficiary, 
request for a payout transfer and get the transfer status.

to run the script in the terminal run:
```
  node app.js
```

You can change the necessary values in the app.js file as per your requirements and re run the script whenever needed.

## Doubts

Reach out to techsupport@cashfree.com in case of doubts.
 


