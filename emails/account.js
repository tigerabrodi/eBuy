const sgMail = require("@sendgrid/mail");
const config = require("config");

sgMail.setApiKey(config.get("sendGridApi"));

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "tiger@abrodi.io",
        subject: "Thanks for joining!",
        text: `Welcome ${name}! Thanks for joining this community! Hopefully you can have a successful journey here, selling & buying! :D`
    })
}

module.exports = {
    sendWelcomeEmail
}