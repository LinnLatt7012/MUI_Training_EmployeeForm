import CloseIcon  from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/system';
import React from 'react'
import Controls from './controls/Controls';
const theme = createTheme();
const useStyles = makeStyles({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute !important',
        top: theme.spacing(5),
        borderRadius: '0px !important'
    },
})
export default function Popup(props) {
    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();
    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }} >
            <DialogTitle>
                <div>
                    <Grid container>
                        <Grid item xs="11">
                            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item xs="1">

                            <Controls.ActionButton
                                color="secondary"
                                onClick = {()=>setOpenPopup(false)} 
                            >
                                <CloseIcon />
                            </Controls.ActionButton>
                            
                        </Grid>
                    </Grid>


                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}
