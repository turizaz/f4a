import mailer, {IMailerResponse} from '../libs/mailer'
import template from '../templates/emails';
import {encrypt} from './crypto';

export default {
    sendConfirmationEmail: (email): Promise<IMailerResponse> => {
        const res =  mailer.sendMail({
            ...formAddress(email),
            subject: 'Confirm email account ✔',
            text: 'Confirm your email account?',
            html: template.confirmEmail(encrypt(email)),
        })
        res.then(console.log)
        return res
    },
    sendNewPassword: (email: string, password: string): Promise<IMailerResponse> => {
        const res = mailer.sendMail({
            ...formAddress(email),
            subject: 'Your new password',
            text: 'Your new password',
            html: template.newPassword(password),
        })
        console.log(res)
        return res
    }
}

function formAddress(email) {
    return {
        from: '"Football for everyone 👻" <f4econtacts@gmail.com>',
        to: email
    }
}
