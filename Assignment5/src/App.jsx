/*
 * Copyright (C) 2018-2022 David C. Harrison. All right reserved.
 *
 * You may not use, distribute, publish, or modify this code without
 * the express written permission of the copyright holder.
 */

import React from 'react';
import loader from './data/loader';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
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
  const drawerWidth = 240;
  const navItems = ['Inbox', 'Trash'];
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mailOpen, setMailOpen] = React.useState({
    load: 'none',
    from: '',
    subject: '',
    address: '',
  });
  const [inboxOpen, setInboxOpen] = React.useState('inbox');
  const [inboxName, setInboxName] = React.useState('Inbox');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleInboxOpen = (item) => {
    if (item === 'Trash') {
      setInboxOpen('trash');
      setInboxName('Trash');
    } else {
      setInboxOpen('inbox');
      setInboxName('Inbox');
    }
  };

  const handleMailOpen = (contF, contS, contA) => {
    if (mailOpen.load === 'none') {
      setMailOpen({load: 'block', from: contF, subject: contS,
        address: contA});
    } else {
      setMailOpen({load: 'none', from: '', subject: '',
        address: ''});
    }
  };

  const handleRecieved = (rec) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    const date = rec.match(/([0-9]+)-([0-9]+)-([0-9]+)(?=T)/);
    const time = rec.match(/([0-9]+):([0-9]+):([0-9]+)(?=Z)/);

    if (today.getFullYear() === +date[1] &&
    today.getMonth() + 1 === +date[2] &&
    today.getDate() === +date[3]) {
      return time[1] + ':' + time[2];
    } else if (today.getFullYear() === +date[1]) {
      return months[+date[2]-1] + ' ' + date[3];
    } else {
      return +date[1];
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{textAlign: 'center'}}
              onClick={ () => handleInboxOpen(item)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{display: 'flex'}}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{mr: 2, display: {sm: 'none'}}}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
          >
            CSE186 Mail - {inboxName}
          </Typography>
          <Box sx={{display: {xs: 'none', sm: 'block'}}}>
            {navItems.map((item) => (
              <Button key={item} sx={{color: '#fff'}}
                onClick={ () => handleInboxOpen(item)}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            'display': {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
            'marginTop': 7,
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{p: 3}}>
        <Grid container spacing={5} >
          <Grid item xs={30} sm={30}>
            {emails.filter((email) => (email.mailbox.includes(inboxOpen)
            )).map( (email) => (
              <List key={email.id}>
                <ListItemButton
                  sx={{marginTop: 4}}
                  aria-label={email.from.name + ' ' + email.subject}
                  onClick={() => handleMailOpen(email.from.name,
                    email.subject, email.from.address)}>
                  {email.from.name}</ListItemButton>
                <ListItem>{email.subject}</ListItem>
                <ListItem>{handleRecieved(email.received)}</ListItem>
                <ListItem>{email.mailbox}</ListItem>
              </List>
            ))}
          </Grid>
        </Grid>
      </Box>
      <AppBar position="fixed" color="primary" sx={{top: 'auto', bottom: 0,
        display: mailOpen.load}}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
          >
            Subject: {mailOpen.subject}
          </Typography>
          <Button variant="outlined"
            color='secondary'
            position='absolute'
            aria-label='close desktop reader'
            onClick={() => handleMailOpen(mailOpen.from, mailOpen.subject,
              mailOpen.address)}
            sx={{top: 0, right: 0}}
          >x</Button>
        </Toolbar>
        <Box>
          <Typography
            variant="h6"
            component="div"
            sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
          >
            To: App User (user@app.com)
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
          >
            From: {mailOpen.from} ({mailOpen.address})
          </Typography>
        </Box>
      </AppBar>
    </Box>
  );
}

export default App;
