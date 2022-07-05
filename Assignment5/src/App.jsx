/*
 * Copyright (C) 2018-2022 David C. Harrison. All right reserved.
 *
 * You may not use, distribute, publish, or modify this code without
 * the express written permission of the copyright holder.
 */

import React from 'react';
import loader from './data/loader';
import emails from './data/emails.json';

loader(); // do not remove this!

/**
 * Simple component with no state.
 *
 * See the basic-react example for an example of adding and reacting to
 * changes in state and lecture 10 for details on Material-UI
 *
 * @return {object} JSX
 */
function App() {
  return (
    <div>
      <h2>Let&apos;s make this look way better with Material-UI, eh?</h2>
      <table>
        <tbody>
          {emails.map((email) => (
            <tr key={email.id}>
              <td>{email.from.name}</td>
              <td>{email.subject}</td>
              <td>{email.received}</td>
              <td>{email.mailbox}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
