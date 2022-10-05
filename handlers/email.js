const emailConfig = require('../config/email')
const nodeMailer  = require('nodemailer')
const hbs         = require('nodemailer-express-handlebars');
const util        = require('util');

let transport = nodeMailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth:{
        user: emailConfig.user,
        pass: emailConfig.pass
    }   
}) 
