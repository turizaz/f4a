import './style.scss';
import React from 'react';
const link = `/api/auth/google`;

function SingInGoogle() {
    return (
        <a href={link}><div className='loginWithGoogle'>
            <img width="20px" alt="Google sign-in"
                                src="/img/Google__G__Logo.svg.webp"/>Войти с google
        </div></a>
        )
}

export default SingInGoogle;
