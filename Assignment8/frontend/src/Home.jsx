import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

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
    fetchMails(setMail, setError, 'inbox');
  }, []);

  return (
    <div>
      <ButtonAppBar></ButtonAppBar>
      <p/>
      <table id='mails'>
        <tbody>
          {mail.map((mail) => (
            <tr key={mail.uqid} id={'id'+mail.uqid}>
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
