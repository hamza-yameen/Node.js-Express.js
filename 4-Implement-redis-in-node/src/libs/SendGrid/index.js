const config = require("./config");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(config.sendGridApiKey);

const sendVerificationMail = async (msg) => {
	try {
		const sendMail = await sgMail.send(msg);
		return sendMail[0];
	} catch (error) {
		console.log("Error : ", error);
	}
};

module.exports = { sendVerificationMail };
