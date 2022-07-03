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
   * @return {object} a <div> containing an <h2>
   */
  render() {
    return (
      <div>
        <h2>CSE186 Assignment 4 - React I</h2>
        <Picker />
      </div>
    );
  }
}

export default App;
