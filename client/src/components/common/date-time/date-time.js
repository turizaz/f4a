/* eslint-disable no-invalid-this */
import React from 'react';
import moment from 'moment';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import './date-time.scss';
import MomentUtils from '@date-io/moment';
import 'moment/locale/ru';
import PropTypes from 'prop-types';
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from 'material-ui-pickers';
moment.locale('ru');

/**
 * Customize view
 */
const materialTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: green,
  },
});

/**
 * Datetime picket from material ui
 */
class DateTimeComponent extends React.Component {
  /**
   * @param {Date} e
   */
  handleDateChange = (e) => {
    const {onChange} = this.props;
    onChange(e);
  };

  /**
   * Render date time widget
   * @return {string} html
   */
  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <MuiThemeProvider theme={materialTheme}>
          <div className="pickers">
            <DatePicker
              className="col-6"
              okLabel="Ок"
              cancelLabel="Не ок"
              value={this.props.value}
              onChange={this.handleDateChange}
            />
            <TimePicker
              okLabel="Ок"
              className="col-6"
              cancelLabel="Не ок"
              ampm={false}
              value={this.props.value}
              onChange={this.handleDateChange}
            />
          </div>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}
DateTimeComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,
};
export default DateTimeComponent;