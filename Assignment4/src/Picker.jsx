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
    this.pickedDate = new Date();
    this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
      16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      32, 33, 34, 35, 36, 37, 38, 39, 40, 41];
    this.greys = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.state = {date: this.date, days: this.numbers};
  }

  /**
   *
   */
  componentDidMount() {
    this.setPicker();
    for (let i = 0; i <= 6; i++) {
      this.setClass(i, true);
    }
    for (let i = 31; i <= 41; i++) {
      this.setClass(i, false);
    }
  }

  /**
   *
   * @param {int} index index of table
   * @param {string} tag current id of table
   * @return {string} id to be returned
   */
  setTag = (index, tag) => {
    if (this.numbers[index] === this.pickedDate.getDate() &&
    this.pickedDate.getMonth() === this.date.getMonth() &&
    this.pickedDate.getFullYear() === this.date.getFullYear() &&
    this.greys[index] === 0) {
      return 'today';
    } else {
      return tag;
    }
  };

  /**
   * @param {int} index index of table
   * @param {bool} before date is before or after month
   * @return {string} grey className
   */
  setClass = (index, before) => {
    if ((before && this.numbers[index] >= 20) ||
      (!before && this.numbers[index] <= 20)) {
      this.greys[index] = 1;
      return 'grey';
    }
    this.greys[index] = 0;
  };

  /**
  *
  */
  setPicker = () => {
    const firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    const lastMonth = new Date(
      this.date.getFullYear(), this.date.getMonth(), 0);
    const lastDay = new Date(
      this.date.getFullYear(), this.date.getMonth()+1, 0);
    let j = lastMonth.getDate();
    let i = 0;
    for (i = firstDay.getDay() - 1; i >= 0; i--) {
      this.numbers[i] = j--;
    }
    j = 1;
    for (i = firstDay.getDay();
      i < lastDay.getDate() + firstDay.getDay(); i++) {
      this.numbers[i] = j++;
    }
    j = 1;
    for (i; i <= 41; i++) {
      this.numbers[i] = j++;
    }
    this.setState({days: this.numbers});
  };

  /**
   *
   * @param {int} offset month to be incremented to
   */
  changeMonth = (offset) => {
    if (offset === 0) {
      this.date = new Date();
    }
    this.date.setMonth(this.date.getMonth() + offset);
    this.setState({date: this.date});
    this.setPicker();
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
          <div id="display" onClick={ () => this.changeMonth(0)}>{
            months[this.state.date.getMonth()] +
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
                <td id={this.setTag(0, 'd0')}
                  className={this.setClass(0, true)}>
                  {this.state.days[0]}</td>
                <td id={this.setTag(1, 'd1')}
                  className={this.setClass(1, true)}>
                  {this.state.days[1]}</td>
                <td id={this.setTag(2, 'd2')}
                  className={this.setClass(2, true)}>
                  {this.state.days[2]}</td>
                <td id={this.setTag(3, 'd3')}
                  className={this.setClass(3, true)}>
                  {this.state.days[3]}</td>
                <td id={this.setTag(4, 'd4')}
                  className={this.setClass(4, true)}>
                  {this.state.days[4]}</td>
                <td id={this.setTag(5, 'd5')}
                  className={this.setClass(5, true)}>
                  {this.state.days[5]}</td>
                <td id={this.setTag(6, 'd6')}
                  className={this.setClass(6, true)}>
                  {this.state.days[6]}</td>
              </tr>
              <tr>
                <td id={this.setTag(7, 'd7')}>{this.state.days[7]}</td>
                <td id={this.setTag(8, 'd8')}>{this.state.days[8]}</td>
                <td id={this.setTag(9, 'd9')}>{this.state.days[9]}</td>
                <td id={this.setTag(10, 'd10')}>{this.state.days[10]}</td>
                <td id={this.setTag(11, 'd11')}>{this.state.days[11]}</td>
                <td id={this.setTag(12, 'd12')}>{this.state.days[12]}</td>
                <td id={this.setTag(13, 'd13')}>{this.state.days[13]}</td>
              </tr>
              <tr>
                <td id={this.setTag(14, 'd14')}>{this.state.days[14]}</td>
                <td id={this.setTag(15, 'd15')}>{this.state.days[15]}</td>
                <td id={this.setTag(16, 'd16')}>{this.state.days[16]}</td>
                <td id={this.setTag(17, 'd17')}>{this.state.days[17]}</td>
                <td id={this.setTag(18, 'd18')}>{this.state.days[18]}</td>
                <td id={this.setTag(19, 'd19')}>{this.state.days[19]}</td>
                <td id={this.setTag(20, 'd20')}>{this.state.days[20]}</td>
              </tr>
              <tr>
                <td id={this.setTag(21, 'd21')}>{this.state.days[21]}</td>
                <td id={this.setTag(22, 'd22')}>{this.state.days[22]}</td>
                <td id={this.setTag(23, 'd23')}>{this.state.days[23]}</td>
                <td id={this.setTag(24, 'd24')}>{this.state.days[24]}</td>
                <td id={this.setTag(25, 'd25')}>{this.state.days[25]}</td>
                <td id={this.setTag(26, 'd26')}>{this.state.days[26]}</td>
                <td id={this.setTag(27, 'd27')}>{this.state.days[27]}</td>
              </tr>
              <tr>
                <td id={this.setTag(28, 'd28')}>{this.state.days[28]}</td>
                <td id={this.setTag(29, 'd29')}>{this.state.days[29]}</td>
                <td id={this.setTag(30, 'd30')}>{this.state.days[30]}</td>
                <td id={this.setTag(31, 'd31')}
                  className={this.setClass(31, false)}>
                  {this.state.days[31]}</td>
                <td id={this.setTag(32, 'd32')}
                  className={this.setClass(32, false)}>
                  {this.state.days[32]}</td>
                <td id={this.setTag(33, 'd33')}
                  className={this.setClass(33, false)}>
                  {this.state.days[33]}</td>
                <td id={this.setTag(34, 'd34')}
                  className={this.setClass(34, false)}>
                  {this.state.days[34]}</td>
              </tr>
              <tr>
                <td id={this.setTag(35, 'd35')}
                  className={this.setClass(35, false)}>
                  {this.state.days[35]}</td>
                <td id={this.setTag(36, 'd36')}
                  className={this.setClass(36, false)}>
                  {this.state.days[36]}</td>
                <td id={this.setTag(37, 'd37')}
                  className={this.setClass(37, false)}>
                  {this.state.days[37]}</td>
                <td id={this.setTag(38, 'd38')}
                  className={this.setClass(38, false)}>
                  {this.state.days[38]}</td>
                <td id={this.setTag(39, 'd39')}
                  className={this.setClass(39, false)}>
                  {this.state.days[39]}</td>
                <td id={this.setTag(40, 'd40')}
                  className={this.setClass(40, false)}>
                  {this.state.days[40]}</td>
                <td id={this.setTag(41, 'd41')}
                  className={this.setClass(41, false)}>
                  {this.state.days[41]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Picker;
