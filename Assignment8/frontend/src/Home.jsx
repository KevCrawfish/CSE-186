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
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import './Home.css';
import {Stack} from '@mui/material';

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
  const [indMail, setIndMail] = React.useState([]);
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
      return months[date.getMonth()] + ' ' + date.getDate();
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
        <div>
          <ListItemButton
            style={{top: 5, position: 'absolute',
              padding: 10}}
            onClick={() => {
              setBox('none');
            }}
            aria-label='back'
          >
            <ArrowBackIosIcon/>
          </ListItemButton>
          <Stack direction={'row'}
            style={{position: 'absolute', top: 0, right: 0}}
          >
            <ListItemButton>
              <MailOutlineIcon fontSize='large'/>
            </ListItemButton>
            <ListItemButton>
              <MoveToInboxIcon fontSize='large'/>
            </ListItemButton>
            <ListItemButton>
              <DeleteIcon fontSize='large'/>
            </ListItemButton>
          </Stack>
        </div>
        <div
          style={{position: 'absolute', top: 110, left: 20,
            background: 'lightgrey', fontFamily: 'sans-serif'}}
        >
          {`${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}`}
        </div>
        <div
          style={{position: 'absolute', top: 135,
            right: 20}}
        >
          <ListItemButton>
            <ReplyIcon/>
          </ListItemButton>
        </div>
        <div>
          {indMail.map((mail) => (
            <div key={mail.mail.id}>
              <div
                style={{position: 'absolute', top: 70,
                  fontWeight: 'bold', left: 20, fontSize: 'large'}}
              >
                {mail.mail.subject}
              </div>
              <div
                style={{position: 'absolute', top: 140,
                  left: 20}}
              >
                <Avatar {...stringAvatar(`${mail.mail.from.name}`)} />
              </div>
              <div
                style={{position: 'absolute', top: 160,
                  left: 70, fontSize: 'large'}}
              >
                {mail.mail.from.email}
              </div>
              <div
                style={{position: 'absolute', top: 140,
                  left: 70, fontSize: 'large'}}
              >
                {mail.mail.from.name + ' ' +
                  handleDate(mail.mail.received)}
              </div>
              <div
                aria-label='mailcontent'
                style={{position: 'absolute', top: 200,
                  left: 20, fontSize: 'large'}}
              >
                {mail.mail.content}
              </div>
            </div>
          ))}
        </div>
        <div>
        </div>
      </Box>
      <ButtonAppBar
        boxChange = {setMailbox}
      />
      <h3
        aria-label='currentbox'
        style={{marginBottom: 0, paddingLeft: 10,
          fontFamily: 'sans-serif'}}
      >{`${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}`}</h3>
      <List id = 'mails' dense={true}>
        {mail.map((mail) => (
          <ListItemButton key={mail.mail.id} id={'id' + mail.mail.id}
            aria-label={mail.mail.from.name}
            onClick={() => {
              setBox('flex');
              setIndMail([mail]);
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
