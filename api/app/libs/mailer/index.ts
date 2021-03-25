
// import {google} from 'googleapis';
// const file = JSON.parse(fs.readFileSync(__dirname+'/test-265610-d2589ad59376.json').toString());

const transporter = null;

// console.log(file.private_key);
// console.log(config)

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         type: 'OAuth2',
//         user: 'f4econtactcenter@gmail.com',
//         refreshToken: config.GMAIL_REFRESH_TOKEN,
//         access_token: config.GMAIL_ACCESS_TOKEN,
//         clientId: config.GMAIL_CLIENT_ID,
//         clientSecret: config.GMAIL_CLIENT_SECRET,
//     },
// });

// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     auth: {
//         privateKey: file.private_key,
//         serviceClient: '101211918838003528763',
//         user: 'contacts@test-265610.iam.gserviceaccount.com',
//         type: 'OAuth2',
//     }
// });

// console.log(file.private_key);
// //
// const jwt = new google.auth.JWT(
//     'contacts@test-265610.iam.gserviceaccount.com',
//     null,
//     file.private_key,
//     ['https://www.googleapis.com/auth/gmail.send'],
//     null
// );
// jwt.authorize((err, tokens) => {
//     console.log('err', err);
//     console.log('tokens', tokens);
//     transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         auth: {
//             privateKey: file.private_key,
//             serviceClient: '101211918838003528763',
//             user: 'contacts@test-265610.iam.gserviceaccount.com',
//             type: 'OAuth2',
//         }
//     });
// })

export interface IMailerResponse {
    messageId: string;
}

export default transporter;
