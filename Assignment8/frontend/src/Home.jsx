import React from 'react';

const fetchMails = (setMails, setError) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('http://localhost:3010/v0/mail?mailbox=inbox', {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      setError('');
      setMails(json);
    })
    .catch((error) => {
      console.log(error);
      setMails([]);
      setError(`${error.status} - ${error.statusText}`);
    });
};

/**
 * @return {object} JSX Table
 */
function Home() {
  const [mail, setMail] = React.useState([]);
  const [error, setError] = React.useState('Logged Out');

  React.useEffect(() => {
    fetchMails(setMail, setError);
  }, []);

  return (
    <div>
      <h2 id='welcome'>CSE186</h2>
      <p/>
      <table id='mails'>
        <tbody>
          {mail.map((mail) => (
            <tr key={mail.mail.id} id={'id'+mail.mail.id}>
              <td>{mail.mail.from.name}</td>
              <td>{mail.mail.subject}</td>
              <td>{mail.mail.content}</td>
              <td>{mail.mail.received}</td>
            </tr>
          ))}
          <tr key={'error'}>
            <td colSpan={4}>{error}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Home;
