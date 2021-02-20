import './style.scss';
import * as React from 'react';
import * as translator from "react-i18next";
const link = `/api/auth/google`;

function SingInGoogle({t}:any) {
    return (
        <a href={link}><div className='loginWithGoogle'>
            <img width="20px" alt="Google sign-in"
                                src="/img/Google__G__Logo.svg.webp"/>{t('Войти')} {t('с')} google
        </div></a>
        )
}

// @ts-ignore
export default translator.withNamespaces()(SingInGoogle);
