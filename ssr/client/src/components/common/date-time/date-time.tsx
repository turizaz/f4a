import * as React from 'react'
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
import * as tr from "react-i18next";
interface Props {
  onChange: any,
  value: any,
  t: any
}
const materialTheme = createMuiTheme({
    palette: {
        primary: green
    },
});

class DateTimeComponent extends React.Component<Props> {
  handleDateChange = (e: any) => {
    const {onChange}: any = this.props
    onChange(e)
  }

  render() {
    const {t} = this.props
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
                            label={t('Дата')}
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
                            label={t('Время')}
                            ampm={false}
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
  }
}


// @ts-ignore
export default tr.withNamespaces()(DateTimeComponent)
