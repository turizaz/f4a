import * as nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'f4econtactcenter@gmail.com',
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
    },
});

export default transporter
