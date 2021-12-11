import { TextField } from '@mui/material'
import React from 'react'

export default function Input(props) {
    const { name, label, value, error=null, onChange , ...other} = props
    return (
            <TextField
            variant="outlined"
            label={label}
            name={name}
            onChange={onChange}
            value={value}
            {...(error && {error:true,helperText:error})}
            {...other}
            />

    )
}


