import * as React from 'react';
import { Grid,Toolbar,AppBar, InputBase, IconButton, Badge } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from '@mui/icons-material/Search';
import {makeStyles} from '@mui/styles';
import {createTheme } from '@mui/material/styles';
const theme = createTheme({
    spacing: 8,
    palette:{
        secondary:{
            main:'#F00'
        }
    }
  });
const UseStyles =makeStyles({
    root:{
        backgroundColor:'#FFF',
    },
    searchInput:{
       opacity: '0.6',
       padding: `${theme.spacing(0, 1)}`,
       fontSize: '0.8rem',
       '&:hover, &:focus, &:active':{
           backgroundColor:'#F2F2F2'
       },
       '& .MuiSvgIcon-root':{
           marginRight: `${theme.spacing(1)}`
       }
    },
    BtnBadge:{
        backgroundColor:'rgba(255,60,20,0.8)'
    }
})

export default function Header() {
    const Classes = UseStyles();
  return (
      <AppBar position="static" className={Classes.root}>
        <Toolbar className={Classes.root}>
            <Grid container 
            alignItems="center">
                <Grid item >
                    <InputBase 
                        placeholder="Search Input" 
                        className={Classes.searchInput}
                        startAdornment={<SearchIcon fontSize='small'/>}
                    />
                </Grid>
                <Grid item sm> </Grid>
                <Grid item >
                    <IconButton >
                        <Badge badgeContent={4} color='secondary' classes={{badge:Classes.BtnBadge}}>
                            <NotificationsNoneIcon fontSize='small'></NotificationsNoneIcon>
                        </Badge>
                    </IconButton>
                    <IconButton>
                        <Badge badgeContent={3} color='primary'>
                            <ChatBubbleOutlineIcon fontSize='small'></ChatBubbleOutlineIcon>
                        </Badge>
                    </IconButton>
                    <IconButton >
                            <PowerSettingsNewIcon fontSize='small'></PowerSettingsNewIcon>
                    </IconButton>
                </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
  );
}