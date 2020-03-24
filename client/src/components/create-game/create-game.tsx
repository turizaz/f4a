import React from 'react'
import './create-game.scss'
import CityPicker from '../../components/common/city-picker'
import ErrorMessage from '../../components/common/messages/error-message'
import _ from 'lodash'
import {withGameService} from '../../hoc-helpers'
import GamesList from './games-list'
import {connect} from 'react-redux'
import DateTimeComponent from '../../components/common/date-time'
import SetCityWidget from '../../components/common/set-city-widget'
import {setCity} from '../../ac/location'
import {setUser} from '../../ac/auth'
import moment from 'moment'
import {loading, loaded} from "../../ac/loader";
moment.locale('ru')

const initialState = {
  data: {
    city: '',
    city_id: '',
    address: '',
    additional: '',
    players: 6,
    date: moment(new Date().setHours(new Date().getHours() + 4)),
    district: '',
  },
  errors: {},
}

interface Props {
  gameService: any,
  auth: any,
  location: any,
  setCity: any,
  setUser: any,
  match: any,
}

class CreateGame extends React.Component<Props> {
  state: {data: any, errors: any}

  constructor(props: any) {
    super(props)
    CreateGame.setMeta()
    this.state = initialState
  }
  static setMeta() {
    document.title = 'Football for everyone'
  }

  setCity = (city: {name: string, id: number, country: string}) => {
    this.setState({
      data: {...this.state.data, city: city.name, city_id: city.id},
    })
  }

  resetCity = () => {
    console.log('reset')
    this.setState({data: {...this.state.data, city: ''}})
  }

  onChange = (e: any) => {
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.value},
    });
  };

  validate = (data: any) => {
    const errors:any = {}
    for (const i in data) {
      if (['players', 'lat', 'long', 'additional'].indexOf(i) !== -1) {
        continue;
      }
      if (!data[i]) errors[i] = `Не может быть пустым`;
    }
    return errors
  };

  changeDate = (e: any) => {
    this.setState({
      data: {
        ...this.state.data,
        date: e,
      },
    });
  }
  getFormStatus() {
    const {auth} = this.props
    return auth.isAuthenticated ? ' active': ' passive';
  }
  checkIfAllowedCreate() {
    const {auth} = this.props
    if (!auth.isAuthenticated) {
      alert('Зарегистрируйтесь чтобы создать игру')
    }
    return auth.isAuthenticated;
  }

  initCity(data: {city: string, city_id: number}) {
    const {setCity} = this.props
    setCity({name: data.city, id: data.city_id});
  }

  onSubmit = async (e: any) => {
    e.preventDefault()

    const {data} = this.state;
    if (!this.checkIfAllowedCreate()) {
      return
    }
    this.initCity(data)
    const errors = this.validate(data);
    this.setState({
      errors,
    });
    if (_.isEmpty(errors)) {
      const {gameService} = this.props;
      try {
        loading()
        const res = await gameService.add(data)
        if (res.status === 201) {
          this.setState(initialState)
        }
      } finally {
        loaded()
      }
    }
  };

  render() {

    const {data, errors} = this.state
    return (
      <div className="row main-content">
        <div className="left-col">
          <form className={'game-form' + this.getFormStatus()} onSubmit={this.onSubmit}>
            <fieldset>
              <legend>Создать игру</legend>
              <div className="form-group" id="gameCitySection">
                <label>Город</label>
                {!this.state.data.city &&
                <CityPicker
                  doChoice={this.setCity}
                  city={this.state.data.city}
                />}
                {
                  this.state.data.city &&
                  <div className={'success-panel'}>{this.state.data.city}
                    <span onClick={this.resetCity}>✕</span>
                  </div>
                }
                {errors.city && <ErrorMessage message={errors.city} />}
              </div>
              <div className="form-group">
                <label>Район.</label>
                <input
                  type="text"
                  className="form-control"
                  name="district"
                  value={data.district}
                  onChange={this.onChange}
                />
                {errors.district && <ErrorMessage message={errors.district} />}
              </div>
              <div className="form-group">
                <label>Адрес</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={data.address}
                  onChange={this.onChange}
                />
                {errors.address && <ErrorMessage message={errors.address} />}
              </div>
              <div className="form-group date">
                <DateTimeComponent
                  onChange={this.changeDate}
                  value={data.date}/>
                {errors.date && <ErrorMessage message={errors.date} />}
              </div>
              <div className="form-group">
                <label>Количество игроков</label>
                <select
                  className="form-control col-2"
                  onChange={this.onChange}
                  value={data.players}
                  name="players"
                >
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                  <option>15</option>
                  <option>16</option>
                  <option>17</option>
                  <option>18</option>
                  <option>19</option>
                  <option>20</option>
                  <option>21</option>
                  <option>22</option>
                </select>
                {errors.players && <ErrorMessage message={errors.players} />}
              </div>
            </fieldset>
            <div className="form-group">
              <label>Дополнительно</label>
              <textarea
                className="form-control"
                name="additional"
                value={data.additional}
                onChange={this.onChange}
              />
              {errors.additional && (
                <ErrorMessage message={errors.additional} />
              )}
            </div>
            <div className="form-group">
              <button type="submit" className="btn submit-btn shadow-0">
                Создать
              </button>
            </div>
          </form>
        </div>
        <div className="right-col">
          <div className="width-100">
            <SetCityWidget/>
            <GamesList />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
    (state: {location: any, game: any, auth: any}) => {
      return {
        location: state.location,
        games: state.game,
        auth: state.auth,
      };
    },
    {setCity, setUser, loading, loaded}
)(withGameService(CreateGame))
