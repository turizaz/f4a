import * as i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
// @ts-ignore
import translationUA from './locales/ua/translation.json';

// the translations
const resources = {
    ua: {
        translation: translationUA
    }
};
// @ts-ignore
i18n.default.use(reactI18nextModule) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "ru",

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n.default;
