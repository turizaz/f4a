import * as React from 'react';
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
            <img alt='football-teem-first' src='/img/red-shirt.svg'/>
          </div>
        </div>
        <div className="vs">—</div>
        <div className="second-teem">
          <div>
            <img alt='football-teem-second' src='/img/white-shirt.svg'/>
          </div>
        </div>
      </div>
    );
  }
}
export default TeemsVsFlags;
