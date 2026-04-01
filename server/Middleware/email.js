const { transporter } = require("../config/email.config");
const { Verification_Email_Template } = require("./emailTemplate");

const sendemail = async (email, verificationCode) => {
    try{
        const info = await transporter.sendMail({
            from: '"Edustack" <pandeyanupam180@gmail.com>',
            to: email,
            subject: "Verify Your Email",
            text: "Verify your Email", // Plain-text version of the message
            html: Verification_Email_Template.replace("{verificationCode}", verificationCode), // HTML version of the message
        });

        return { emailMsg: "Verification code send to your Email"}
    } catch (error) {
        console.log("Error during  email verification", error)
    }
}

module.exports = { sendemail };
