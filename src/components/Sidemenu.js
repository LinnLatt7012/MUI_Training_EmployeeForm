import React from 'react';
import {  withStyles } from '@mui/styles';
const styles = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height:'100%',
        backgroundColor:' #253053'
      }
}

const Sidemenu= (props) => {
    const {classes} =  props;
    return (
        <div className={classes.sideMenu}>
            
        </div>
    )
}

export default withStyles(styles)(Sidemenu)


