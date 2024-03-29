import * as React from 'react';
import './about.scss';
import * as translator from "react-i18next";
import Quotes from "../quotes";
interface Props {
    t: any
}
/**
 * About page
 */
class About extends React.Component<Props> {

  componentDidMount() {
    About.setMeta();
  }

  /**
   * @return {string} html
   */
  render() {
    const {t} = this.props
    return (
        <div>
            <h3>
                <article>
                    <i>
                        {t('Если ты не знаешь, где найти людей для игры в футбол - это сайт как раз для тебя! Тут ты можешь собрать команду для игры в футбол, назначить игру либо присоединится к уже существующей.')}
                        <span> </span>
                        {t('Также тут найдешь, цитаты великих фуболистов, правила игры и интересные факты о футболе')}
                    </i>
                </article>
            </h3>
            <article>
                <Quotes/>
            </article>
        </div>
    );
  }

  static setMeta() {
    document.title = 'About';
  }
}

// @ts-ignore
export default translator.withNamespaces()(About);
