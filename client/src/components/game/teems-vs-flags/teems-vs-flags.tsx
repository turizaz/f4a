import React from 'react';
import './teems-vs-flags.scss';

/**
 * Teem flags in game widget
 */
class TeemsVsFlags extends React.Component {
  render() {
    return (
      <div className="teems-vs-flags">
        <div className="first-teem">
          <div>
            <img src='/img/blue-shirt.png'/>
          </div>
        </div>
        <div className="vs">—</div>
        <div className="second-teem">
          <div>
            <img src='/img/yellow-shirt.png'/>
          </div>
        </div>
      </div>
    );
  }
}
export default TeemsVsFlags;
