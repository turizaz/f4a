/* eslint-disable no-invalid-this */

import React from 'react';
import './game-form.scss';
import CityPicker from 'components/common/city-picker';
import ErrorMessage from 'components/common/messages/error-message';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {withGameService} from 'hoc-helpers';
import GamesList from './games-list';
import {connect} from 'react-redux';
import DateTimeComponent from 'components/common/date-time';
import SetCityWidget from 'components/common/set-city-widget';
import {setCity} from 'ac/location';
import {setUser} from 'ac/auth';

const initialState = {
  data: {
    city: '',
    city_id: '',
    address: '',
    lat: '',
    long: '',
    additional: '',
    players: 6,
    date: new Date(),
    district: '',
  },
  errors: {},
};
/**
 * Form for adding game event
 */
class GameForm extends React.Component {
  /**
   * Set initial state
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  /**
   * Did mount hook
   */
  componentDidMount() {
    const hash = window.location.hash.substr(1);
    if (hash) {
      const {setUser} = this.props;
      setUser(hash);
    }
  }n;
  /**
   * Set city
   * @param {{name: string, id: number, country: string}} city
   */
  setCity = (city) => {
    this.setState({
      data: {...this.state.data, city: city.name, city_id: city.id},
    });
  };
  /**
   * Handle all simple text inputs
   * @param {object} e
   * @return {void}
   */
  onChange = (e) => {
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.value},
    });
  };
  /**
   * Form validation
   * @param {object} data
   * @return {object}
   */
  validate = (data) => {
    const errors = {};
    for (const i in data) {
      if (['players', 'lat', 'long', 'additional'].indexOf(i) !== -1) {
        continue;
      }
      if (!data[i]) errors[i] = `Не может быть пустым`;
    }
    return errors;
  };
  /**
   * @param {Event} e
   * Change date
   */
  changeDate = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        date: e,
      },
    });
  };
  /**
   * @param {object} e
   */
  onSubmit = async (e) => {
    e.preventDefault();
    const {auth, setCity} = this.props;
    if (!auth.isAuthenticated) {
      alert('Зарегистрируйтесь чтобы создать игру');
      return;
    }
    const {data} = this.state;
    setCity({name: data.city, id: data.city_id});
    const errors = this.validate(data);
    this.setState({
      errors,
    });
    if (_.isEmpty(errors)) {
      const {gameService} = this.props;
      const res = await gameService.add(data);
      if (res.status === 201) {
        this.setState(initialState);
      }
    }
  };
  /**
   * Render form for adding game event
   * @return {string} - HTML markup for the component
   */
  render() {
    const {auth} = this.props;
    const {data, errors} = this.state;
    return (
      <div className="row">
        <div className="col-6 col-md-3 left-col">
          <form className=
            {'game-form' + (auth.isAuthenticated ? ' active': ' passive')}
          onSubmit={this.onSubmit}>
            <fieldset>
              <legend>Добавить игру.</legend>
              <div className="form-group" id="gameCitySection">
                <label>Город</label>
                <CityPicker
                  doChoice={this.setCity}
                  city={this.state.data.city}
                />
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
              <div className="form-group">
                <label>Дата</label>
                <DateTimeComponent
                  onChange={this.changeDate}
                  value={this.state.data.date}/>
                {errors.date && <ErrorMessage message={errors.date} />}
              </div>
              {false && (
                <div>
                  <fieldset>
                    <legend>Координаты (не обязательно)</legend>
                    <div className="form-row">
                      <div className="col-6">
                        <label>с.ш.</label>
                        <input
                          type="number"
                          className="form-control"
                          value={data.lat}
                          name="lat"
                          onChange={this.onChange}
                        />
                        {errors.lat && <ErrorMessage message={errors.lat} />}
                      </div>
                      <div className="col-6">
                        <label>в.д.</label>
                        <input
                          type="number"
                          className="form-control"
                          name="long"
                          value={data.long}
                          onChange={this.onChange}
                        />
                        {errors.long && <ErrorMessage message={errors.long} />}
                      </div>
                    </div>
                  </fieldset>
                </div>
              )}
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
              <button type="submit" className="btn submit-btn">
                Создать
              </button>
            </div>
          </form>
        </div>
        <div className="col-12 col-md-9 flex right-col">
          <div className="width-100">
            <SetCityWidget/>
            <GamesList />
          </div>
        </div>
      </div>
    );
  }
}
GameForm.propTypes = {
  gameService: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  setCity: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect(
    (state) => {
      return {
        location: state.location,
        games: state.game,
        auth: state.auth,
      };
    },
    {setCity, setUser}
)(withGameService(GameForm));
