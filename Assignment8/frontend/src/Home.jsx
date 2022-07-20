import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

/**
 * app bar from mui
 * @return {appbar}
 */
function ButtonAppBar() {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            CSE 186
          </Typography>
          <Button color="inherit">Log-Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

/**
 *
 * @param {string} string
 * @return {color}
 */
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

/**
 *
 * @param {string} name
 * @return {child}
 */
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split('')[0][0]}`,
  };
}

const fetchMails = (setMails, setError, mailbox) => {
  const item = localStorage.getItem('user');
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
  if (error) {};

  React.useEffect(() => {
    fetchMails(setMail, setError, 'inbox');
  }, []);
  return (
    <div>
      <ButtonAppBar></ButtonAppBar>
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
    </div>
  );
}

export default Home;
