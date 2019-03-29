import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './field-player.scss';
/**
 * Player ui on football field
 */
class FieldPlayer extends Component {
  /**
   * @return {JSX} html
   */
  render() {
    const {isActive, teem} = this.props;
    const activeShirt = '/img/'+teem+'-shirt.png';
    return (
      <div>
        {isActive ?
          <img alt={'active-shirt'} src={activeShirt}/>
          : <img
            alt={'grey-shirt'}
            className={'t-shirt-grey'}
            src='/img/grey-shirt.png' />}
      </div>
    );
  }
}
FieldPlayer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  teem: PropTypes.string.isRequired,
};
export default FieldPlayer;
