import React from 'react';
import './teems-vs-flags.scss';

/**
 * Teem flags in game widget
 */
class TeemsVsFlags extends React.Component {
  /**
   * Init
   */
  componentDidMount() {
    this.alignUiFlags();
  }
  /**
   * @return {JSX} html
   */
  render() {
    return (
      <div className="teems-vs-flags">
        <div className="first-teem">
          <div className="second-teem"/>
        </div>
      </div>
    );
  }
  /**
   * Align ui flags
   */
  alignUiFlags() {
    const widthFirstTeem =
      document.getElementsByClassName('first-teem')[0].offsetWidth;
    document.getElementsByClassName('second-teem')[0].style.borderRight =
        widthFirstTeem+'px solid transparent';
  }
};
export default TeemsVsFlags;
