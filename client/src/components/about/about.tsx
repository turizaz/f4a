import React, {Component} from 'react';
import './about.scss';
import {withNamespaces} from "react-i18next";
interface Props {
    t: any
}
/**
 * About page
 */
class About extends Component<Props> {

  componentDidMount() {
    About.setMeta();
  }

  /**
   * @return {string} html
   */
  render() {
    const {t} = this.props
    return (
      <h3>
        <article>
            <i>
            {t('Если ты не знаешь, где найти людей для игры в футбол - это сайт как раз для тебя! Тут ты можешь собрать команду для игры в футбол. Тут ты можешь создать игру либо присоединится к уже существующей.')}
            </i>
            </article>
      </h3>
    );
  }

  static setMeta() {
    document.title = 'About';
  }
}

// @ts-ignore
export default withNamespaces()(About);
