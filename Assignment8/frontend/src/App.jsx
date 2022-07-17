import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './Login';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
