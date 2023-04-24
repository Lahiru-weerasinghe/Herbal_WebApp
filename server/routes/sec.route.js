express = require('express'),
  router = express.Router();
const Paymentcard = require('../models/payment.card.model');
const Paymentmobile = require('../models/payment.mobile.model');
const { json } = require('body-parser');
const otpGenerator = require('otp-generator')
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const paymentCardModel = require('../models/payment.card.model');
const paymentMobileModel = require('../models/payment.mobile.model');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
	username: 'api',
	key: 'key-488183a25a363bd5721455138741be10',
});

//generate otp for the email
router.route('/generate/:femail/:lemail').get((req,res)=>{
    const femail = req.params.femail;
    const lemail = req.params.lemail;
    const email = femail + "@" + lemail;
    const otp = otpGenerator.generate(10, { upperCaseAlphabets: false, specialChars: false });
    console.log(email)
    mg.messages
	.create('sandbox15a85ee49cc24e33b40c554754dc27bb.mailgun.org', {
		from: "Govi Hub <postmaster@sandbox15a85ee49cc24e33b40c554754dc27bb.mailgun.org>", // our email
		to: [email], // Email
		subject: "OTP For your payment!.", // Subject of the email
		text: "Your OTP code is: " +otp, // msg body
	})
	.then(msg => {
        console.log(msg)
        return res.json({otp:otp});
    }) // logs response data
	.catch(err => {
        console.log(err.details)
        return res.json({error:err.details});
    }); // logs any error`;
   
});

//card payment
router.route('/paymentcc').post((req,res)=>{
    const cardnumber = req.body.cardnumber;
    const e_month = req.body.e_month;
    const e_year = req.body.e_year;
	const cvv = req.body.cvv;
    paymentCardModel.find({cardno:cardnumber,expiry_m:e_month,expiry_y:e_year,cvv:cvv},(err,carddata) =>{
        if(carddata.length > 0){
            return res.json({card:"valid"});
        }else{
            return res.json({card:"Invalid"});
        }
    })
});

//mobile payment
router.route('/paymentmc').post((req,res)=>{
    const mobilenumber = req.body.mobilenumber;
    const secnumber = req.body.secnumber;
    paymentMobileModel.find({mobileno:mobilenumber,secreatcode:secnumber},(err,mobiledata) =>{
        if(mobiledata.length > 0){
            return res.json({mobile:"valid"});
        }else{
            return res.json({mobile:"Invalid"});
        }
    })
});


module.exports = router;