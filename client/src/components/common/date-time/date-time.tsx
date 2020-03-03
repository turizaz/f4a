import React from 'react'
import 'date-fns';

import Grid from '@material-ui/core/Grid';
import './customDatePickerWidth.scss'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import MomentUtils from "@date-io/moment";
import "moment/locale/ru"
import './date-time.scss'
import green from '@material-ui/core/colors/green'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core'
interface Props {
  onChange: any,
  value: any
}
const materialTheme = createMuiTheme({
    palette: {
        primary: green,
    },
});

class DateTimeComponent extends React.Component<Props> {
  handleDateChange = (e: any) => {
    const {onChange} = this.props
      console.log(e)
      console.log(this.props.value)
    onChange(e)
  }

  render() {
      console.log(this.props.value)
    return (
        <div className="date">
            <MuiThemeProvider theme={materialTheme}>
                <MuiPickersUtilsProvider locale="ru" utils={MomentUtils}>
                    <Grid container justify="space-around">
                        <div className={'customDatePickerWidth'}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            margin="normal"
                            id="date-picker-inline"
                            label="Дата"
                            value={this.props.value}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        </div>
                        <div className={'customDatePickerWidth'}>
                        <KeyboardTimePicker
                            disableToolbar
                            margin="normal"
                            id="time-picker"
                            label="Время"
                            cancelLabel="Отмена"
                            okLabel="Подтвердить"
                            value={this.props.value}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                        </div>
                    </Grid>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        </div>

    )
    // return (
    //   <MuiPickersUtilsProvider utils={MomentUtils}>
    //     <MuiThemeProvider theme={materialTheme}>
    //       <div className="pickers">
    //         <DatePicker
    //           className="col-6"
    //           okLabel="Ок"
    //           cancelLabel="Не ок"
    //           value={this.props.value}
    //           onChange={this.handleDateChange}
    //         />
    //         <TimePicker
    //           okLabel="Ок"
    //           className="col-6"
    //           cancelLabel="Не ок"
    //           ampm={false}
    //           value={this.props.value}
    //           onChange={this.handleDateChange}
    //         />
    //       </div>
    //     </MuiThemeProvider>
    //   </MuiPickersUtilsProvider>
    // );
  }
}
export default DateTimeComponent
