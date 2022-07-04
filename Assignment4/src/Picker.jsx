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
    this.state = {date: this.date, days: this.numbers, grey: this.greys};
  }

  /**
   *
   */
  componentDidMount() {
    this.setPicker();
  }

  /**
   *
   * @param {date} date date to set to
   */
  setDate = (date) => {
    this.date = new Date(date.getFullYear(), date.getMonth());
    this.pickDate = new Date(date.getFullYear(), date.getMonth(),
      date.getDate());
    this.setPicker();
  };

  /**
   *
   * @param {int} index index of table
   */
  pickDate = (index) => {
    const prev = this.numbers[index];
    if (this.greys[index] === 1) {
      if (this.numbers[index] >= 20) {
        this.changeMonth(-1);
      } else {
        this.changeMonth(1);
      }
    } else {
      this.setState({date: this.date, days: this.numbers, grey: this.greys});
    }
    this.pickedDate = new Date(this.date.getFullYear(),
      this.date.getMonth(), prev);
    console.log(this.pickedDate);
  };

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
      this.greys[i] = 1;
    }
    j = 1;
    for (i = firstDay.getDay();
      i < lastDay.getDate() + firstDay.getDay(); i++) {
      this.numbers[i] = j++;
      this.greys[i] = 0;
    }
    j = 1;
    for (i; i <= 41; i++) {
      this.numbers[i] = j++;
      this.greys[i] = 1;
    }
    this.setState({date: this.date, days: this.numbers, grey: this.greys});
  };

  /**
   *
   * @param {int} offset month to be incremented to
   */
  changeMonth = (offset) => {
    if (offset === 0) {
      this.date = new Date();
      this.pickedDate = new Date();
    }
    this.date.setMonth(this.date.getMonth() + offset);
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
                  className={this.state.grey[0] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(0)}>{this.state.days[0]}</td>
                <td id={this.setTag(1, 'd1')}
                  className={this.state.grey[1] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(1)}>{this.state.days[1]}</td>
                <td id={this.setTag(2, 'd2')}
                  className={this.state.grey[2] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(2)}>{this.state.days[2]}</td>
                <td id={this.setTag(3, 'd3')}
                  className={this.state.grey[3] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(3)}>{this.state.days[3]}</td>
                <td id={this.setTag(4, 'd4')}
                  className={this.state.grey[4] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(4)}>{this.state.days[4]}</td>
                <td id={this.setTag(5, 'd5')}
                  className={this.state.grey[5] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(5)}>{this.state.days[5]}</td>
                <td id={this.setTag(6, 'd6')}
                  className={this.state.grey[6] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(6)}>{this.state.days[6]}</td>
              </tr>
              <tr>
                <td id={this.setTag(7, 'd7')} onClick={() => this.pickDate(7)}
                >{this.state.days[7]}</td>
                <td id={this.setTag(8, 'd8')} onClick={() => this.pickDate(8)}
                >{this.state.days[8]}</td>
                <td id={this.setTag(9, 'd9')} onClick={() => this.pickDate(9)}
                >{this.state.days[9]}</td>
                <td id={this.setTag(10, 'd10')} onClick={() =>
                  this.pickDate(10)}>{this.state.days[10]}</td>
                <td id={this.setTag(11, 'd11')} onClick={() =>
                  this.pickDate(11)}>{this.state.days[11]}</td>
                <td id={this.setTag(12, 'd12')} onClick={() =>
                  this.pickDate(12)}>{this.state.days[12]}</td>
                <td id={this.setTag(13, 'd13')} onClick={() =>
                  this.pickDate(13)}>{this.state.days[13]}</td>
              </tr>
              <tr>
                <td id={this.setTag(14, 'd14')} onClick={() =>
                  this.pickDate(14)}>{this.state.days[14]}</td>
                <td id={this.setTag(15, 'd15')} onClick={() =>
                  this.pickDate(15)}>{this.state.days[15]}</td>
                <td id={this.setTag(16, 'd16')} onClick={() =>
                  this.pickDate(16)}>{this.state.days[16]}</td>
                <td id={this.setTag(17, 'd17')} onClick={() =>
                  this.pickDate(17)}>{this.state.days[17]}</td>
                <td id={this.setTag(18, 'd18')} onClick={() =>
                  this.pickDate(18)}>{this.state.days[18]}</td>
                <td id={this.setTag(19, 'd19')} onClick={() =>
                  this.pickDate(19)}>{this.state.days[19]}</td>
                <td id={this.setTag(20, 'd20')} onClick={() =>
                  this.pickDate(20)}>{this.state.days[20]}</td>
              </tr>
              <tr>
                <td id={this.setTag(21, 'd21')} onClick={() =>
                  this.pickDate(21)}>{this.state.days[21]}</td>
                <td id={this.setTag(22, 'd22')} onClick={() =>
                  this.pickDate(22)}>{this.state.days[22]}</td>
                <td id={this.setTag(23, 'd23')} onClick={() =>
                  this.pickDate(23)}>{this.state.days[23]}</td>
                <td id={this.setTag(24, 'd24')} onClick={() =>
                  this.pickDate(24)}>{this.state.days[24]}</td>
                <td id={this.setTag(25, 'd25')} onClick={() =>
                  this.pickDate(25)}>{this.state.days[25]}</td>
                <td id={this.setTag(26, 'd26')} onClick={() =>
                  this.pickDate(26)}>{this.state.days[26]}</td>
                <td id={this.setTag(27, 'd27')} onClick={() =>
                  this.pickDate(27)}>{this.state.days[27]}</td>
              </tr>
              <tr>
                <td id={this.setTag(28, 'd28')}
                  className={this.state.grey[28] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(28)}>
                  {this.state.days[28]}</td>
                <td id={this.setTag(29, 'd29')}
                  className={this.state.grey[29] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(29)}>
                  {this.state.days[29]}</td>
                <td id={this.setTag(30, 'd30')}
                  className={this.state.grey[30] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(30)}>
                  {this.state.days[30]}</td>
                <td id={this.setTag(31, 'd31')}
                  className={this.state.grey[31] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(31)}>
                  {this.state.days[31]}</td>
                <td id={this.setTag(32, 'd32')}
                  className={this.state.grey[32] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(32)}>
                  {this.state.days[32]}</td>
                <td id={this.setTag(33, 'd33')}
                  className={this.state.grey[33] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(33)}>
                  {this.state.days[33]}</td>
                <td id={this.setTag(34, 'd34')}
                  className={this.state.grey[34] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(34)}>
                  {this.state.days[34]}</td>
              </tr>
              <tr>
                <td id={this.setTag(35, 'd35')}
                  className={this.state.grey[35] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(35)}>
                  {this.state.days[35]}</td>
                <td id={this.setTag(36, 'd36')}
                  className={this.state.grey[36] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(36)}>
                  {this.state.days[36]}</td>
                <td id={this.setTag(37, 'd37')}
                  className={this.state.grey[37] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(37)}>
                  {this.state.days[37]}</td>
                <td id={this.setTag(38, 'd38')}
                  className={this.state.grey[38] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(38)}>
                  {this.state.days[38]}</td>
                <td id={this.setTag(39, 'd39')}
                  className={this.state.grey[39] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(39)}>
                  {this.state.days[39]}</td>
                <td id={this.setTag(40, 'd40')}
                  className={this.state.grey[40] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(40)}>
                  {this.state.days[40]}</td>
                <td id={this.setTag(41, 'd41')}
                  className={this.state.grey[41] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(41)}>
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
