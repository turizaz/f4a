import config from '../../config'
import {google} from  'googleapis';
import axios from 'axios';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer'

const file = JSON.parse(fs.readFileSync(__dirname+'/test-265610-d2589ad59376.json').toString());

console.log(file.private_key);
//
const jwt = new google.auth.JWT(
    'contacts@test-265610.iam.gserviceaccount.com',
    null,
    file.private_key,
    ['https://www.googleapis.com/auth/gmail.send'],
    null
);
// jwt.authorize((err, tokens) => {
//     console.log('err', err);
//     console.log('tokens', tokens);
//
//
// })

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        privateKey:  file.private_key,
        serviceClient: '101211918838003528763',
        user: 'contacts@test-265610.iam.gserviceaccount.com',
        type: 'OAuth2',
    }
});

// const oauth2Client = new google.auth.OAuth2(
//     config.GMAIL_CLIENT_ID,
//     config.GMAIL_CLIENT_SECRET,
//     'http://localhost:3050/auth/gmail/oauth/callback'
// );
//
// // generate a url that asks permissions for Blogger and Google Calendar scopes
// const scopes = ['https://www.googleapis.com/auth/gmail.send']
//
// const url = oauth2Client.generateAuthUrl({
//     // 'online' (default) or 'offline' (gets refresh_token)
//     access_type: 'offline',
//     // If you only need one scope you can pass it as a string
//     scope: scopes
// });
//
//
// console.log(url);
//
// axios.get(url).then(console.log);



