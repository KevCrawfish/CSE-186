import React from 'react';
import './Picker.css';

/**
 * Picker component.
 */
class Picker extends React.Component {
  /**
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.date = new Date();
    this.state = {date: this.date};
  }

  /**
 *
 * @param {date} date current picker set date
 * @param {array} numbers array of picker's date
  setDates(date) {
    // const todayDate = new Date();
    this.setState({month: months[date.getMonth()], year: date.getFullYear()});
  /**
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastMonth = new Date(date.getFullYear(), date.getMonth(), 0);
  const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0);
  let j = lastMonth.getDate();
  let i = 0;
  for (i = firstDay.getDay() - 1; i >= 0; i--) {
    numbers[i] = j--;
  }
  j = 1;
  for (i = firstDay.getDay(); i < lastDay.getDate() + firstDay.getDay(); i++) {
    numbers[i] = j++;
  }
  j = 1;
  for (i; i <= 41; i++) {
    numbers[i] = j++;
  }
  }
  */

  changeMonth = (offset) => {
    this.date.setMonth(this.date.getMonth() + offset);
    this.setState({date: this.date});
  };

  /**
   * @return {object} a <div> containing the picker
   */
  render() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return (
      <div id="picker">
        <div id="top">
          <span id="prev" onClick={ () => this.changeMonth(-1)}></span>
          <span id="next" onClick={ () => this.changeMonth(1)}></span>
          <div id="display">{months[this.state.date.getMonth()] +
            ' ' + this.state.date.getFullYear()}</div>
        </div>
        <div id="table">
          <table id="days">
            <thead>
              <tr>
                <th id="S">S</th>
                <th id="M">M</th>
                <th id="T">T</th>
                <th id="W">W</th>
                <th id="T">T</th>
                <th id="F">F</th>
                <th id="S">S</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td id="d0"></td>
                <td id="d1"></td>
                <td id="d2"></td>
                <td id="d3"></td>
                <td id="d4"></td>
                <td id="d5"></td>
                <td id="d6"></td>
              </tr>
              <tr>
                <td id="d7"></td>
                <td id="d8"></td>
                <td id="d9"></td>
                <td id="d10"></td>
                <td id="d11"></td>
                <td id="d12"></td>
                <td id="d13"></td>
              </tr>
              <tr>
                <td id="d14"></td>
                <td id="d15"></td>
                <td id="d16"></td>
                <td id="d17"></td>
                <td id="d18"></td>
                <td id="d19"></td>
                <td id="d20"></td>
              </tr>
              <tr>
                <td id="d21"></td>
                <td id="d22"></td>
                <td id="d23"></td>
                <td id="d24"></td>
                <td id="d25"></td>
                <td id="d26"></td>
                <td id="d27"></td>
              </tr>
              <tr>
                <td id="d28"></td>
                <td id="d29"></td>
                <td id="d30"></td>
                <td id="d31"></td>
                <td id="d32"></td>
                <td id="d33"></td>
                <td id="d34"></td>
              </tr>
              <tr>
                <td id="d35"></td>
                <td id="d36"></td>
                <td id="d37"></td>
                <td id="d38"></td>
                <td id="d39"></td>
                <td id="d40"></td>
                <td id="d41"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Picker;
