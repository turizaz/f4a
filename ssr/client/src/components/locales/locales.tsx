import * as React from 'react';
import * as i18n from "../../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";
import './locales.scss'
export default class Locales extends React.Component {
    async setLocale(locale: string) {
        // @ts-ignore
        await i18n.changeLanguage(locale)
        return null
    }
    render(): React.ReactNode {
        return (
            <div className='locales'>
                {/*<FontAwesomeIcon icon={faGlobe} size='2x'/>*/}
                <a href="#" data-loc="ua" onClick={this.setLocale.bind(null, 'ua')}>
                    <img src='/locales/ua-32.png'/>
                </a>
                <span>  </span>
                <a href="#" data-loc="ru" onClick={this.setLocale.bind(null, 'ru')}>
                    <img src='/locales/ru-32.png'/>
                </a>
            </div>
        )
    }
}
