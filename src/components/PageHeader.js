import { Card, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { createTheme } from '@mui/system'
import React from 'react'
const theme = createTheme({
    spacing: 8,
})
const useStyles = makeStyles({
    root:{
        backgroundColor:'#fdfdff'
    },
    pageHeader:{
        padding: theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(2)  
    },
    pageIcon:{
        display:'inline-block',
        padding:theme.spacing(2),
        color:'#3c44b1'
    },
    pageTitle: {
        paddingLeft: theme.spacing(4),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    },

})

function PageHeader(props) {
    const classes = useStyles();
    const {icon,title,subTitle} =props;
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography
                    variant="h6"
                    component="div">
                    {title}</Typography>
                    <Typography
                    variant="subtitle2"
                    component="div">
                    {subTitle}</Typography> 
                </div>
            </div>
        </Paper>
    )
}

export default PageHeader
