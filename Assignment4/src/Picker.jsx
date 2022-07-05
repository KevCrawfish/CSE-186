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
    this.todays = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.state = {date: this.date, days: this.numbers, grey: this.greys,
      today: this.todays};
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
    this.pickedDate = new Date(date.getFullYear(), date.getMonth(),
      date.getDate());
    this.setPicker();
  };

  /**
   *
   * @param {int} index index of table
   */
  pickDate = (index) => {
    if (this.greys[index] === 1) {
      if (this.numbers[index] >= 20) {
        const temp = new Date(this.date);
        temp.setMonth(this.date.getMonth() - 1);
        this.pickedDate = new Date(temp.getFullYear(),
          temp.getMonth(), this.numbers[index]);
        this.changeMonth(-1);
      } else {
        const temp = new Date(this.date);
        temp.setMonth(this.date.getMonth() + 1);
        this.pickedDate = new Date(temp.getFullYear(),
          temp.getMonth(), this.numbers[index]);
        this.changeMonth(1);
      }
    } else {
      this.todays.fill(0);
      this.todays[index] = 1;
      this.pickedDate = new Date(this.date.getFullYear(),
        this.date.getMonth(), this.numbers[index]);
      this.setState({date: this.date, days: this.numbers, grey: this.greys,
        today: this.todays});
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
      this.todays[i] = 0;
    }
    j = 1;
    for (i = firstDay.getDay();
      i < lastDay.getDate() + firstDay.getDay(); i++) {
      if (j === this.pickedDate.getDate() &&
      this.pickedDate.getMonth() === this.date.getMonth() &&
      this.pickedDate.getFullYear() === this.date.getFullYear()) {
        this.todays[i] = 1;
      } else {
        this.todays[i] = 0;
      }
      this.numbers[i] = j++;
      this.greys[i] = 0;
    }
    j = 1;
    for (i; i <= 41; i++) {
      this.numbers[i] = j++;
      this.greys[i] = 1;
      this.todays[i] = 0;
    }
    this.setState({date: this.date, days: this.numbers, grey: this.greys,
      today: this.todays});
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
          <span id="prev" aria-label='prev'
            onClick={ () => this.changeMonth(-1)}></span>
          <span id="next" aria-label='next'
            onClick={ () => this.changeMonth(1)}></span>
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
                <td id={this.todays[0] === 1 ? 'today' : 'd0'}
                  className={this.state.grey[0] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(0)}>{this.state.days[0]}</td>
                <td id={this.todays[1] === 1 ? 'today' : 'd1'}
                  className={this.state.grey[1] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(1)}>{this.state.days[1]}</td>
                <td id={this.todays[2] === 1 ? 'today' : 'd2'}
                  className={this.state.grey[2] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(2)}>{this.state.days[2]}</td>
                <td id={this.todays[3] === 1 ? 'today' : 'd3'}
                  className={this.state.grey[3] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(3)}>{this.state.days[3]}</td>
                <td id={this.todays[4] === 1 ? 'today' : 'd4'}
                  className={this.state.grey[4] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(4)}>{this.state.days[4]}</td>
                <td id={this.todays[5] === 1 ? 'today' : 'd5'}
                  className={this.state.grey[5] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(5)}>{this.state.days[5]}</td>
                <td id={this.todays[6] === 1 ? 'today' : 'd6'}
                  onClick={() => this.pickDate(6)}>{this.state.days[6]}</td>
              </tr>
              <tr>
                <td id={this.todays[7] === 1 ? 'today' : 'd7'}
                  onClick={() => this.pickDate(7)}
                >{this.state.days[7]}</td>
                <td id={this.todays[8] === 1 ? 'today' : 'd8'}
                  onClick={() => this.pickDate(8)}
                >{this.state.days[8]}</td>
                <td id={this.todays[9] === 1 ? 'today' : 'd9'}
                  onClick={() => this.pickDate(9)}
                >{this.state.days[9]}</td>
                <td id={this.todays[10] === 1 ? 'today' : 'd10'}
                  onClick={() => this.pickDate(10)}
                >{this.state.days[10]}</td>
                <td id={this.todays[11] === 1 ? 'today' : 'd11'}
                  onClick={() => this.pickDate(11)}
                >{this.state.days[11]}</td>
                <td id={this.todays[12] === 1 ? 'today' : 'd12'}
                  onClick={() => this.pickDate(12)}
                >{this.state.days[12]}</td>
                <td id={this.todays[13] === 1 ? 'today' : 'd13'}
                  onClick={() => this.pickDate(13)}
                >{this.state.days[13]}</td>
              </tr>
              <tr>
                <td id={this.todays[14] === 1 ? 'today' : 'd14'}
                  onClick={() => this.pickDate(14)}
                >{this.state.days[14]}</td>
                <td id={this.todays[15] === 1 ? 'today' : 'd15'}
                  onClick={() => this.pickDate(15)}
                >{this.state.days[15]}</td>
                <td id={this.todays[16] === 1 ? 'today' : 'd16'}
                  onClick={() => this.pickDate(16)}
                >{this.state.days[16]}</td>
                <td id={this.todays[17] === 1 ? 'today' : 'd17'}
                  onClick={() => this.pickDate(17)}
                >{this.state.days[17]}</td>
                <td id={this.todays[18] === 1 ? 'today' : 'd18'}
                  onClick={() => this.pickDate(18)}
                >{this.state.days[18]}</td>
                <td id={this.todays[19] === 1 ? 'today' : 'd19'}
                  onClick={() => this.pickDate(19)}
                >{this.state.days[19]}</td>
                <td id={this.todays[20] === 1 ? 'today' : 'd20'}
                  onClick={() => this.pickDate(20)}
                >{this.state.days[20]}</td>
              </tr>
              <tr>
                <td id={this.todays[21] === 1 ? 'today' : 'd21'}
                  onClick={() => this.pickDate(21)}
                >{this.state.days[21]}</td>
                <td id={this.todays[22] === 1 ? 'today' : 'd22'}
                  onClick={() => this.pickDate(22)}
                >{this.state.days[22]}</td>
                <td id={this.todays[23] === 1 ? 'today' : 'd23'}
                  onClick={() => this.pickDate(23)}
                >{this.state.days[23]}</td>
                <td id={this.todays[24] === 1 ? 'today' : 'd24'}
                  onClick={() => this.pickDate(24)}
                >{this.state.days[24]}</td>
                <td id={this.todays[25] === 1 ? 'today' : 'd25'}
                  onClick={() => this.pickDate(25)}
                >{this.state.days[25]}</td>
                <td id={this.todays[26] === 1 ? 'today' : 'd26'}
                  onClick={() => this.pickDate(26)}
                >{this.state.days[26]}</td>
                <td id={this.todays[27] === 1 ? 'today' : 'd27'}
                  onClick={() => this.pickDate(27)}
                >{this.state.days[27]}</td>
              </tr>
              <tr>
                <td id={this.todays[28] === 1 ? 'today' : 'd28'}
                  className={this.state.grey[28] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(28)}>
                  {this.state.days[28]}</td>
                <td id={this.todays[29] === 1 ? 'today' : 'd29'}
                  className={this.state.grey[29] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(29)}>
                  {this.state.days[29]}</td>
                <td id={this.todays[30] === 1 ? 'today' : 'd30'}
                  className={this.state.grey[30] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(30)}>
                  {this.state.days[30]}</td>
                <td id={this.todays[31] === 1 ? 'today' : 'd31'}
                  className={this.state.grey[31] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(31)}>
                  {this.state.days[31]}</td>
                <td id={this.todays[32] === 1 ? 'today' : 'd32'}
                  className={this.state.grey[32] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(32)}>
                  {this.state.days[32]}</td>
                <td id={this.todays[33] === 1 ? 'today' : 'd33'}
                  className={this.state.grey[33] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(33)}>
                  {this.state.days[33]}</td>
                <td id={this.todays[34] === 1 ? 'today' : 'd34'}
                  className={this.state.grey[34] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(34)}>
                  {this.state.days[34]}</td>
              </tr>
              <tr>
                <td id={this.todays[35] === 1 ? 'today' : 'd35'}
                  className={this.state.grey[35] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(35)}>
                  {this.state.days[35]}</td>
                <td id={this.todays[36] === 1 ? 'today' : 'd36'}
                  className={this.state.grey[36] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(36)}>
                  {this.state.days[36]}</td>
                <td id='d37'
                  className={this.state.grey[37] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(37)}>
                  {this.state.days[37]}</td>
                <td id='d38'
                  className={this.state.grey[38] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(38)}>
                  {this.state.days[38]}</td>
                <td id='d39'
                  className={this.state.grey[39] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(39)}>
                  {this.state.days[39]}</td>
                <td id='d40'
                  className={this.state.grey[40] === 1 ? 'grey' : ''}
                  onClick={() => this.pickDate(40)}>
                  {this.state.days[40]}</td>
                <td id='d41'
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
