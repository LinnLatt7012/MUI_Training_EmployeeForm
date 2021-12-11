import React from 'react';
import './App.css';
import Sidemenu from '../components/Sidemenu';
import Header from '../components/Header';
import { makeStyles } from '@mui/styles';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Employees from '../Page/Employees/Employees';
const theme = createTheme({
  palette: {
    secondary: {
      main: '#f83245',
      light: '#f8324526'
    },
    primary: {
      main: '#333996',
      light: '#33399626'
    },
    background: {
      default: '#f4f4f4'
    }
  },
  shape: {
    borderRadius: '12px'
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          transform: 'translateZ(0)'
        }
      }
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: false
      }
    }
  },

});
const style = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%',
  }
})
function App() {
  const classes = style()
  return (
    <ThemeProvider theme={theme}>
      <Sidemenu />
      <div className={classes.appMain}>
        <Header />
        <Employees />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
