import React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ButtonAppBar from './Appbar';
import stringAvatar from './Stringavatar';

const fetchMails = (setMails, setError, mailbox) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('http://localhost:3010/v0/mail?mailbox=' + mailbox, {
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
  if (error) {};

  React.useEffect(() => {
    fetchMails(setMail, setError, 'inbox');
  }, []);
  return (
    <div>
      <ButtonAppBar/>
      <p/>
      <List id = 'mails' dense={false}>
        {mail.map((mail) => (
          <ListItem key={mail.mail.id} id={'id' + mail.mail.id}
            aria-label={mail.mail.from.name}>
            <ListItemIcon>
              <Avatar {...stringAvatar(`${mail.mail.from.name}`)} />
            </ListItemIcon>
            <ListItemText
              primary = {
                <div>
                  <div>{mail.mail.from.name}</div>
                  <div>{mail.mail.subject}</div>
                </div>
              }
              secondary = {mail.mail.content}
            />
          </ListItem>
        ))}
      </List>
      <div key={'error'}>
        <div colSpan={4}>{error}</div>
      </div>
    </div>
  );
}

export default Home;
