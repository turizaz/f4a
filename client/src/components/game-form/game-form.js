import React from 'react';
import './game-form.scss';
/**
 * Form for adding game event
 *
 */
class GameForm extends React.Component {
  /**
   * Render form for adding game event
   * @return {string} - HTML markup for the component
   */
  render() {
    return (
      <form className="game-form col-6">
        <fieldset>
          <legend>Добавить игру</legend>
          <div className="form-group">
            <label>Город</label>
            <input type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Адрес</label>
            <input type="text" className="form-control"/>
          </div>
          <div>
            <fieldset>
              <legend>Координаты (не обязательно)</legend>
              <div className="form-row">
                <div className="col-6">
                  <label>с.ш.</label>
                  <input type="text" className="form-control"/>
                </div>
                <div className="col-6">
                  <label>в.д.</label>
                  <input type="text" className="form-control"/>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="form-group">
            <label>Количество игроков</label>
            <select className="form-control col-2">
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
            </select>
          </div>
        </fieldset>
        <div className="form-group">
          <label>Дополнительно</label>
          <textarea className="form-control"/>
        </div>
        <div className="form-group">
          <button type="button" className="btn btn-warning">
            Создать
          </button>
        </div>
      </form>
    );
  }
}

export default GameForm;
