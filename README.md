#  Cashfree Node.Js Integration 

Python bindings for interacting with the Cashfree API. This is useful for merchants who are looking to automate their bank transfers programatically. 

# Using 

As you can see there are two files. "Execute.js" is a guide to calling the API.
NOTE : Ensure that "execute.js" and "cfPayout.js" are in the same folder.

# Setting Up

You will need to authenticate client by calling the clientAuth function as follows : 

```node.js
const user = require('./cfPayout.js');

let user2 = new user;
user2.clientAuth('dummyClientId','dummyClientSecret',"TEST/PROD");

```

# Functionality

You can perform the following functions : 

**Add Beneficiary**
```
user2.addBeneficiary('JOHN180121','john doe', 'johndoe@cashfree.com', '9876543210','00091111202233','HDFC0000001','vpa','ABC Street','add 2','Bangalore', 'Karnataka','560001' )
```

**Request Transfer**
```
user2.requestTransfer('JOHN18011','100','76723288672267867867','banktransfer','optional');
```
**Get Transfer Status**

```
user2.getTransferStatus('76723288672267867867');
```
**Validate Bank Details**

```
user2.bankDetailsValidation("Joh",'9910115208', '00011020001772', 'HDFC0000001');
```

**Check Balance**

```
user2.getBalance();

```

## Found a bug?

Report it at [https://github.com/cashfree/cashfree-payout-node/issues](https://github.com/cashfree/cashfree-payout-node/issues)


# Support

For further queries, reach us at techsupport@gocashfree.com .

********************************************************************************** 





