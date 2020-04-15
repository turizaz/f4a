import * as nodemailer from 'nodemailer'
import config from '../../config'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'f4econtactcenter@gmail.com',
        refreshToken: config.GMAIL_REFRESH_TOKEN,
        clientId: config.GMAIL_CLIENT_ID,
        clientSecret: config.GMAIL_CLIENT_SECRET,
    },
});

export default transporter
