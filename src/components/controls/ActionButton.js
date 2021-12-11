import React from 'react'
import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/system';
const theme = createTheme()
const useStyles = makeStyles({
    root:{
        minWidth: '0 !important',
        margin : '0px !important'
    },
    secondary: {
        '& .MuiSvgIcon-root':{
            fill: "red"
        }
    },
    primary: {
        '& .MuiSvgIcon-root':{
            fill: "blue"
        }
    },

})

export default function ActionButton(props) {
    const {color,children, onClick} = props
    const classes = useStyles()
    return (
        <Button 
        className ={`${classes.root} ${classes[color]}`}
        color={color}
        onClick={onClick}>
            {children}
        </Button>
    )
}
