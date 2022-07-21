import React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ButtonAppBar from './Appbar';
import stringAvatar from './Stringavatar';
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './Home.css';

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
  const [mailbox, setMailbox] = React.useState('inbox');
  const [box, setBox] = React.useState('none');
  if (error) {};

  const handleDate= (rec) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    const date = new Date(rec);

    if (today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()) {
      return date.getHours() + ':' + date.getMinutes();
    } else if (today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() - 1 === date.getDate()) {
      return 'Yesterday';
    } else if (today.getFullYear() === date.getFullYear()) {
      return months[date.getMonth()] + (date.getDate() < 10 ? ' 0' : ' ') +
          date.getDate();
    } else {
      return date.getFullYear();
    }
  };

  React.useEffect(() => {
    fetchMails(setMail, setError, mailbox);
  }, [mailbox]);
  return (
    <div>
      <Box
        sx={{
          'display': `${box}`,
          'position': 'fixed',
          'width': '100%',
          'zIndex': 1,
          'height': '100%',
          'top': '0',
          'backgroundColor': 'white',
        }}
      >
        <ArrowBackIosIcon
          style={{padding: 10}}
          onClick={() => {
            setBox('none');
          }}
        />
      </Box>
      <ButtonAppBar
        boxChange = {setMailbox}
      />
      <h3
        style={{marginBottom: 0, paddingLeft: 10,
          fontFamily: 'sans-serif'}}
      >{`${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}`}</h3>
      <List id = 'mails' dense={true}>
        {mail.map((mail) => (
          <ListItemButton key={mail.mail.id} id={'id' + mail.mail.id}
            aria-label={mail.mail.from.name}
            onClick={() => {
              setBox('flex');
            }}
            >
            <ListItemIcon>
              <Avatar {...stringAvatar(`${mail.mail.from.name}`)} />
            </ListItemIcon>
            <ListItemText
              primary = {
                <div>
                  <div
                    style={{display: 'flex'}}
                  >
                    <div>
                      {mail.mail.from.name}
                    </div>
                    <div
                      style={{position: 'absolute', right: 15}}
                    >
                      {handleDate(mail.mail.received)}
                    </div>
                  </div>
                  <div>{mail.mail.subject}</div>
                </div>
              }
              secondary = {mail.mail.content.length >= 40 ?
                mail.mail.content.substring(0, 40) + '...' :
                mail.mail.content}
            />
          </ListItemButton>
        ))}
      </List>
      <div key={'error'}>
        <div colSpan={4}>{error}</div>
      </div>
    </div>
  );
}

export default Home;
