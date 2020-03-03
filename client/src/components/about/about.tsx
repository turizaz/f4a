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
           Тут ты можешь создать игру либо присоединится к уже существующей
        </article>
        <hr/>
        <div className={'guide padding-top-0'}>
          <p>Как создать игру:</p>
          <iframe title="Как создать игру" width="100%" height="500"
            src="https://www.youtube.com/embed/3qZnOWd4HMw" frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media;
     gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
        <div className={'guide'}>
          <p>Как присоединится к игре:</p>
          <iframe title="Как присоединится к игре" width="100%" height="500"
            src="https://www.youtube.com/embed/X0I9aNDMaH8"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media;
             gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
      </div>
    );
  }

  static setMeta() {
    document.title = 'About';
  }
}

export default About;
