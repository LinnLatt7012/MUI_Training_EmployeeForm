import React from 'react'
import {Button as MuiButton} from '@mui/material'
import { styled } from '@mui/system';
const MuiBtn = styled(MuiButton)(({ theme }) => ({
    margin: theme.spacing(0.5),
    '& .MuiButton-text':{
        textTransform: 'none',
    }
}))


export default function Button(props) {
    const {color,text,size, variant, onClick, ...other} = props;
    return (
        <MuiBtn
        color= {color || "primary"}
        variant={variant || "contained"}
        size={size || "large"}
        onClick={onClick} 
        {...other} 
        >{text}
        </MuiBtn>
    )
}
