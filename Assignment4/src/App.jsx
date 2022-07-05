import React from 'react';
import Picker from './Picker';
import './App.css';

/**
 * Simple component with no state.
 *
 * See the basic-react from lecture for an example of adding and
 * reacting to changes in state.
 */
class App extends React.Component {
  /**
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.pickRef = React.createRef();
    this.state = {date: new Date(), disabled: true};
  }
  /**
   *
   * @param {event} event event
   */
  handleInput = (event) => {
    /**
     * Reference: Šime Vidas
     * https://stackoverflow.com/questions/8647893/regular-expression-leap-years-and-more
     */
    const date = new Date(event.target.value);
    const input = event.target.value.split('/');
    if (date.getMonth() + 1 === +input[0] &&
      date.getDate() === +input[1] &&
      date.getFullYear() === +input[2]) {
      this.setState({date: date, disabled: false});
    } else {
      this.setState({date: new Date(), disabled: true});
    }
  };

  /**
   * @return {object} a <div> containing an <h2>
   * References: CSE 186 Lecture 7
   */
  render() {
    return (
      <div>
        <h2>CSE186 Assignment 4 - React I</h2>
        <Picker ref={this.pickRef}/>
        <input
          id="date"
          type="text"
          placeholder='MM/DD/YYYY'
          onInput={ (event) => this.handleInput(event)}
        />
        <button
          id='set'
          disabled={this.state.disabled}
          onClick={() => this.pickRef.current.setDate(this.state.date)}
        >Set</button>
      </div>
    );
  }
}

export default App;
