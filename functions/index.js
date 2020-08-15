'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;


admin.initializeApp();


//google account credentials used to send email
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});


exports.sendEmail = functions.database.ref('/advertencias/{sessionId}').onCreate((snap, context) => {

        const mailOptions = {
            from: gmailEmail,
            to: snap.val().email,
            subject: 'Advertência de Uso do App LEV',
            html: '<p>Nome: ' + snap.val().nome + '</p>'+
                  '<p>E-mail: ' + snap.val().email + '</p>'+
                  '<p>Mensagem: ' + snap.val().mensagem + '</p>'+
                  '<p>Data: ' + snap.val().date + '</p>'
        };


        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log(error)
                return
            }
            console.log("Sent!")
        });
    });
