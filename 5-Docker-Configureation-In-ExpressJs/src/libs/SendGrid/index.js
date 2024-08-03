import sgMail from "@sendgrid/mail";
import config from "../../../config/app.js";

sgMail.setApiKey(config.SENDGRID.SENDGRID_API_KEY);

export const sendVerificationMail = async (msg) => {
	try {
		const sendMail = await sgMail.send(msg);
		return sendMail[0];
	} catch (error) {
		console.log("Error : ", error);
	}
};
