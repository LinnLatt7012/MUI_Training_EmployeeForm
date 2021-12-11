import React from 'react'
import { Alert, Snackbar } from '@mui/material';
export default function Notification(props) {
    const {notify, setNotify} = props

    const handleClose = (event, reason)=>{
        if(reason === 'clickaway')
            return;
        setNotify({
            ...notify,
            isOpen:false
        })
    }
    return (
        <Snackbar
        open={notify.isOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        style={{top:'16px'}}
        >
            <Alert severity={notify.type} onClose={handleClose}>
               {notify.message}
            </Alert>
        </Snackbar>
    )
}
