import React, {Component} from 'react';

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
        Цель этого приложения помочь людям
        находить себе партнеров по игре в футбол
      </div>
    );
  }

  static setMeta() {
    document.title = 'About';
  }
}

export default About;
