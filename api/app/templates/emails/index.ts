import config from '../../config';

export default {
    newPassword: (password) => {
        return `<div>Your new password is - ${password}</div>`
    },
    confirmEmail: (hash: string) => {
        return `<b>To confirm your account</b><a href="${config.HOST}/api/auth/confirm-email/${hash}">Click here</a>`;
    },
}
