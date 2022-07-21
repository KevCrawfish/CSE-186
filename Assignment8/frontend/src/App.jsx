import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Login';
import Home from './Home';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
