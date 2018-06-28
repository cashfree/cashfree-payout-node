const user = require('./cfPayout.js');

let user2 = new user;

console.log(user2.clientAuth('dummyClientId','dummyClientSecret',"TEST"));
user2.expiryCheck();
console.log(user2.addBeneficiary('JOHN180121','john doe', 'johndoe@cashfree.com', '9876543210','00091111202233','HDFC0000001','vpa','ABC Street','add 2','Bangalore', 'Karnataka','560001' ));
user2.requestTransfer('JOHN18011','100','76723288672267867867','banktransfer','optional');
user2.getTransferStatus('76723288672267867867');
user2.bankDetailsValidation("Joh",'9910115208', '00011020001772', 'HDFC0000001');
user2.getBalance();
