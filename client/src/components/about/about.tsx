import React, {Component} from 'react';
import './about.scss';
/**
 * About page
 */
class About extends Component {

  componentDidMount() {
    About.setMeta();
  }

  /**
   * @return {string} html
   */
  render() {
    return (
      <div>
        <article>
          Если ты не знаешь, где <strong>
          найти людей для игры в футбол
          </strong>
          <span> - это сайт как раз для тебя!</span>
        </article>
          <article>
              Тут ты можешь собрать команду для игры в футбол.
          </article>
        <article>
           Тут ты можешь создать игру либо присоединится к уже существующей.
        </article>
      </div>
    );
  }

  static setMeta() {
    document.title = 'About';
  }
}

export default About;
