/* eslint-disable no-invalid-this */

import React from 'react';
import './game-form.scss';
import CityPicker from 'components/common/city-picker';
import ErrorMessage from 'components/common/messages/error-message';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {withGameService} from 'hoc-helpers';
/**
 * Form for adding game event
 */
class GameForm extends React.Component {
  state = {
    data: {
      city: '',
      street: '',
      lat: '',
      long: '',
      additional: '',
      quantity: 5,
    },
    errors: {},
  };
  /**
   * Set city
   * @param {{name: string, id: number, country: string}} city
   */
  setCity = (city) => {
    this.setState({
      data: {...this.state.data, city: city.name},
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
      if (['quantity', 'lat', 'long', 'additional'].indexOf(i) !== -1) {
        continue;
      }
      if (!data[i]) errors[i] = `Не может быть пустым`;
    }
    return errors;
  };
  /**
   * @param {object} e
   */
  onSubmit = (e) => {
    e.preventDefault();
    const {data} = this.state;

    const errors = this.validate(data);
    this.setState({
      errors,
    });
    if (_.isEmpty(errors)) {
      const {gameService} = this.props;
      gameService.add(data);
    }
  };
  /**
   * Render form for adding game event
   * @return {string} - HTML markup for the component
   */
  render() {
    const {data, errors} = this.state;
    return (
      <form
        className="game-form col-6"
        onSubmit={this.onSubmit}
      >
        <fieldset>
          <legend>Добавить игру</legend>
          <div className="form-group">
            <label>Город</label>
            <CityPicker doChoice={this.setCity} />
            {errors.city && <ErrorMessage message={errors.city} />}
          </div>
          <div className="form-group">
            <label>Адрес</label>
            <input
              type="text"
              className="form-control"
              name="street"
              value={data.street}
              onChange={this.onChange}
            />
            {errors.street && <ErrorMessage message={errors.street} />}
          </div>
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
          <div className="form-group">
            <label>Количество игроков</label>
            <select
              className="form-control col-2"
              onChange={this.onChange}
              value={data.quantity}
              name="quantity"
            >
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
            </select>
            {errors.quantity && <ErrorMessage message={errors.quantity} />}
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
          {errors.additional && <ErrorMessage message={errors.additional} />}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-warning">
            Создать
          </button>
        </div>
      </form>
    );
  }
}
GameForm.propTypes = {
  gameService: PropTypes.object.isRequired,
};
export default withGameService(GameForm);
